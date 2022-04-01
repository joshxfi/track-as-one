import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { modalTransitions } from '@/utils/constants';

export interface ModalProps {
  body?: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ body, isOpen, setIsOpen }: ModalProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-50 bg-gray-600/60'
        onClose={() => setIsOpen(false)}
      >
        <div className='grid min-h-screen place-items-center text-center'>
          <Transition.Child as={Fragment} {...modalTransitions.overlay}>
            <Dialog.Overlay className='fixed inset-0' />
          </Transition.Child>

          <Transition.Child as={Fragment} {...modalTransitions.body}>
            <div className='transform'>{body}</div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
