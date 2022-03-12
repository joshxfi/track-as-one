import React, { Fragment } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import { Dialog, Transition } from '@headlessui/react';
import Loader from './Loader';

export interface ModalProps {
  title?: string;
  description?: string;
  body?: React.ReactNode;
  buttons?: React.ReactNode;
  isOpen: boolean;
  onDismiss?: () => void;
  href?: string;
  proceed?: () => void;
  proceedText?: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading?: boolean;
  empty?: boolean;
  containerStyle?: string;
}

const Modal = ({
  title,
  description,
  body,
  buttons,
  isOpen,
  onDismiss,
  href,
  proceed,
  proceedText,
  setIsOpen,
  isLoading,
  empty,
  containerStyle,
}: ModalProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-50 bg-gray-600/60'
        onClose={() => {
          setIsOpen(false);
          if (onDismiss) onDismiss();
        }}
      >
        <div
          className={`min-h-screen ${
            !empty && 'px-4'
          } grid place-items-center text-center`}
        >
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0' />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            {!isLoading ? (
              <div
                className={
                  empty
                    ? ''
                    : `max-w-md ${
                        containerStyle || 'w-[350px] p-6 md:w-full'
                      } transform rounded-xl bg-white text-left shadow-xl transition-all`
                }
              >
                {!empty && (
                  <Dialog.Title
                    as='h3'
                    className='mb-2 flex justify-between text-lg font-medium leading-6 text-gray-800'
                  >
                    <p>{title}</p>

                    <button
                      type='button'
                      onClick={() => {
                        setIsOpen(false);
                        if (onDismiss) onDismiss();
                      }}
                      className='md:text-2xl'
                    >
                      <IoMdCloseCircle />
                    </button>
                  </Dialog.Title>
                )}

                {description ? (
                  <p className='break-words text-sm text-gray-500 md:text-base'>
                    {description}
                  </p>
                ) : (
                  body
                )}

                {!empty && (
                  <div className='mt-4 flex flex-wrap justify-end space-x-2'>
                    {href && (
                      <a
                        href={href}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='modal-btn bg-secondary'
                      >
                        Continue
                      </a>
                    )}

                    {proceed && (
                      <button
                        type='button'
                        className='modal-btn bg-secondary'
                        onClick={proceed}
                      >
                        {proceedText || 'Continue'}
                      </button>
                    )}

                    {buttons}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <Loader />
              </div>
            )}
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
