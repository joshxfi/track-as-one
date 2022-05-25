import React, { Fragment, useCallback } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import { Dialog, Transition } from '@headlessui/react';
import { modalTransitions } from '@/utils/constants';

type Proceed = {
  action?: () => void;
  onSubmit?: () => void;
  href?: string;
  text?: string;
  style?: string;
};

export interface ModalProps {
  title?: string;
  description?: string;
  body?: React.ReactNode;
  buttons?: React.ReactNode;
  isOpen: boolean;
  onDismiss?: () => void;
  proceed?: Proceed;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  containerStyle?: string;
}

const Modal = ({
  title,
  description,
  body,
  buttons,
  isOpen,
  onDismiss,
  proceed,
  setIsOpen,
  containerStyle,
}: ModalProps) => {
  const dismiss = useCallback(() => {
    setIsOpen(false);
    if (onDismiss) onDismiss();
  }, [onDismiss]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-50 bg-gray-600/60'
        onClose={dismiss}
      >
        <div className='grid min-h-screen place-items-center px-4 text-center'>
          <Transition.Child as={Fragment} {...modalTransitions.overlay}>
            <Dialog.Overlay className='fixed inset-0' />
          </Transition.Child>

          <Transition.Child as={Fragment} {...modalTransitions.body}>
            <div
              className={`max-w-md ${
                containerStyle || 'w-[350px] p-6 md:w-full'
              } transform rounded-md bg-white text-left shadow-xl transition-all`}
            >
              <Dialog.Title
                as='h3'
                className='mb-2 flex justify-between text-lg font-medium leading-6 text-gray-800'
              >
                <p>{title}</p>

                <button type='button' onClick={dismiss} className='md:text-2xl'>
                  <IoMdCloseCircle />
                </button>
              </Dialog.Title>
              <form
                onSubmit={(e) => {
                  if (proceed?.onSubmit) {
                    e.preventDefault();
                    proceed?.onSubmit?.();
                  }
                }}
              >
                {description ? (
                  <p className='break-words text-sm text-gray-500 md:text-base'>
                    {description}
                  </p>
                ) : (
                  body
                )}

                <div className='mt-4 flex flex-wrap justify-end space-x-3'>
                  {proceed && (
                    <button
                      type='button'
                      onClick={dismiss}
                      className='mr-4 text-sm font-medium text-gray-800'
                    >
                      Cancel
                    </button>
                  )}

                  {proceed?.href && (
                    <a
                      href={proceed.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className={`modal-btn ${proceed.style ?? 'bg-green-500'}`}
                    >
                      {proceed.text ?? 'Continue'}
                    </a>
                  )}

                  {proceed?.action && (
                    <button
                      type='button'
                      className={`modal-btn ${proceed.style ?? 'bg-green-500'}`}
                      onClick={proceed.action}
                    >
                      {proceed.text ?? 'Continue'}
                    </button>
                  )}

                  {proceed?.onSubmit && (
                    <button
                      type='submit'
                      className={`modal-btn ${proceed.style ?? 'bg-green-500'}`}
                    >
                      {proceed.text ?? 'Save'}
                    </button>
                  )}

                  {buttons}
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
