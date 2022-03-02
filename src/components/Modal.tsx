import React, { Fragment } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import { Dialog, Transition } from '@headlessui/react';
import Loader from './Loader';

interface ModalProps {
  title: string;
  description?: string;
  body?: React.ReactNode;
  buttons?: React.ReactNode;
  isOpen: boolean;
  href?: string;
  proceed?: () => void;
  dismiss: () => void;
  isLoading?: boolean;
}

const Modal = ({
  title,
  description,
  body,
  buttons,
  isOpen,
  href,
  proceed,
  dismiss,
  isLoading,
}: ModalProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-50 bg-gray-600/60'
        onClose={dismiss}
      >
        <div className='min-h-screen px-4 text-center grid place-items-center'>
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
              <div className='md:w-full max-w-md w-[350px] p-6 text-left transition-all bg-white shadow-xl rounded-xl transform'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium leading-6 text-gray-800 mb-2 flex justify-between'
                >
                  <p>{title}</p>

                  <button
                    type='button'
                    onClick={dismiss}
                    className='md:text-2xl'
                  >
                    <IoMdCloseCircle />
                  </button>
                </Dialog.Title>

                {description ? (
                  <p className='text-sm md:text-base text-gray-500 break-words'>
                    {description}
                  </p>
                ) : (
                  body
                )}

                <div className='mt-4 space-x-2 flex justify-end flex-wrap'>
                  {href && (
                    <a
                      href={href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='bg-amber-500 modal-btn'
                    >
                      Continue
                    </a>
                  )}

                  {proceed && (
                    <button
                      type='button'
                      className='bg-amber-500 modal-btn'
                      onClick={proceed}
                    >
                      Continue
                    </button>
                  )}

                  {buttons}
                </div>
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
