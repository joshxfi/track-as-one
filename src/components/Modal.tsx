import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface ModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  href?: string;
  proceed?: () => void;
  dismiss: () => void;
}

const Modal = ({
  title,
  description,
  isOpen,
  href,
  proceed,
  dismiss,
}: ModalProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-50 overflow-y-auto bg-gray-100/40'
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
            <div className='md:w-full max-w-md w-[350px] p-6 overflow-hidden text-left transition-all bg-white shadow-xl rounded-2xl mr-4 transform'>
              <Dialog.Title
                as='h3'
                className='text-lg font-medium leading-6 text-gray-900'
              >
                {title}
              </Dialog.Title>
              <div className='mt-2'>
                <p className='text-sm text-gray-500'>{description}</p>
              </div>

              <div className='mt-4 space-x-4'>
                {href ? (
                  <a
                    href={href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='bg-secondary modal-btn'
                  >
                    Proceed
                  </a>
                ) : (
                  <button
                    type='button'
                    className='bg-secondary modal-btn'
                    onClick={proceed}
                  >
                    Proceed
                  </button>
                )}

                <button
                  type='button'
                  className='bg-gray-200 modal-btn'
                  onClick={dismiss}
                >
                  Dismiss
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
