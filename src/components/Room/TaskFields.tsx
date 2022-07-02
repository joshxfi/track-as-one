import React, { useCallback, useRef, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { BsXSquareFill } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';
import DatePicker, { ReactDatePicker } from 'react-datepicker';

import { ImageFill } from '@/components';
import Modal, { ModalProps } from '@/components/Modal';
import 'react-datepicker/dist/react-datepicker.css';
import { nanoid } from 'nanoid';

type SetState<T = string> = React.Dispatch<React.SetStateAction<T>>;

interface TaskFieldsProps extends Omit<ModalProps, 'body' | 'title'> {
  description: string;
  setDesc: SetState;
  dueDate: Date | null;
  setDueDate: SetState<Date | null>;
  url: string;
  setUrl: SetState;
  images: File[];
  setImages: SetState<File[]>;
  section: string;
  setSection: SetState;
}

const TaskFields = ({
  description,
  setDesc,
  dueDate,
  setDueDate,
  url,
  setUrl,
  images,
  setImages,
  section,
  setSection,
  ...rest
}: TaskFieldsProps) => {
  const [imgUrls, setImgUrls] = useState(['']);
  const [selectedImg, setSelectedImg] = useState(0);

  const dateInputRef = useRef<ReactDatePicker>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const revokeImages = useCallback(
    () =>
      imgUrls.forEach((url) => {
        URL.revokeObjectURL(url);
      }),
    [imgUrls]
  );

  const imgHandler: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const { files } = e.target;

      if (files) {
        for (let i = 0; i < files.length; i++) {
          if (files[i].size > 3 * 1024 * 1024) {
            toast.error('Max image size is 3MB');
            return;
          }
        }

        if (files.length > 5) {
          toast.error('You can only upload up to 5 images');
          return;
        }

        if (files.length === 1) {
          if (images.length === 5) {
            setImages((prev) => {
              const copy = prev.map((p) => p);
              // eslint-disable-next-line prefer-destructuring
              copy[selectedImg] = files[0];

              return copy;
            });
          } else setImages((prev) => [...prev, files[0]]);
        } else setImages(Array.from(files));
      }
    },
    [images, selectedImg]
  );

  useEffect(() => {
    revokeImages();
    const imgsSrc: string[] = [];
    images.forEach((img) => {
      imgsSrc.push(URL.createObjectURL(img));
    });

    setImgUrls(imgsSrc);
  }, [images]);

  return (
    <>
      <input
        ref={fileRef}
        multiple
        accept='image/png,image/gif,image/jpeg'
        className='hidden'
        type='file'
        onChange={imgHandler}
      />
      <Modal
        {...rest}
        title='Task'
        onDismiss={revokeImages}
        body={
          <div className='mt-4 flex max-h-[430px] flex-col space-y-4 overflow-y-scroll'>
            <div className='room-input-container'>
              <textarea
                maxLength={500}
                onChange={(e) => setDesc(e.target.value)}
                value={description}
                placeholder='Task Description'
                className='room-input max-h-[300px] min-h-[100px]'
              />
            </div>
            <div className='flex-between room-input-container group'>
              <DatePicker
                placeholderText='Add Due Date (optional)'
                selected={dueDate}
                showTimeSelect
                onChange={(date: Date) => setDueDate(date)}
                ref={dateInputRef}
                className='room-input pr-2'
              />

              <div className='room-input-btn'>
                <BsXSquareFill onClick={() => setDueDate(null)} />
              </div>
            </div>

            <div className='room-input-container'>
              <input
                onChange={(e) => setUrl(e.target.value)}
                value={url}
                type='text'
                placeholder='Add URL (optional)'
                className='room-input'
              />
            </div>

            <hr />
            <p className='text-sm text-gray-600'>Add Images (optional)</p>

            <div className='flex flex-wrap gap-4'>
              {imgUrls.map((url, i) => (
                <button
                  key={nanoid()}
                  type='button'
                  onClick={() => {
                    setSelectedImg(i);
                    fileRef.current?.click();
                  }}
                >
                  <ImageFill src={url} className='task-img-container' />
                </button>
              ))}

              {Array(5 - images.length)
                .fill(0)
                .map(() => (
                  <button
                    key={nanoid()}
                    type='button'
                    onClick={() => fileRef.current?.click()}
                    className='task-img-container grid place-items-center border-2 bg-f9 text-2xl text-inputfg focus-within:border-primary'
                  >
                    <AiOutlinePlus />
                  </button>
                ))}
            </div>
            {images.length > 0 && (
              <button
                type='button'
                onClick={() => {
                  revokeImages();
                  setImages([]);
                  setImgUrls([]);
                }}
                className='self-start text-sm text-gray-700 underline'
              >
                Clear Images
              </button>
            )}

            <hr />
          </div>
        }
      />
    </>
  );
};

export default TaskFields;
