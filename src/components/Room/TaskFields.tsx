import React, { useCallback, useRef } from 'react';
import toast from 'react-hot-toast';
import { BsXSquareFill } from 'react-icons/bs';
import DatePicker, { ReactDatePicker } from 'react-datepicker';

import Modal, { ModalProps } from '@/components/Modal';
import 'react-datepicker/dist/react-datepicker.css';

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
  ...rest
}: TaskFieldsProps) => {
  const dateInputRef = useRef<ReactDatePicker>(null);
  const fileRef = useRef<HTMLInputElement>(null);

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

        if (files.length > 3) toast.error('You can only upload up to 3 images');
        else setImages(Array.from(files));
      }
    },
    [setImages]
  );

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
        body={
          <div className='mt-4 flex flex-col space-y-4'>
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

            <button
              onClick={() => fileRef.current?.click()}
              type='button'
              className='room-input-container'
            >
              <p className='resize-[vertical] flex items-center text-left text-sm text-[#9CA3AF] md:text-base'>
                Add Image {images.length}/3 (optional)
              </p>
            </button>
          </div>
        }
      />
    </>
  );
};

export default TaskFields;
