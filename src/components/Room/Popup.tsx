import React from 'react';

interface PopupProps {
  title?: React.ReactNode;
  proceed: () => void;
  dismiss: () => void;
}

const Popup = ({ title, proceed, dismiss }: PopupProps) => {
  return (
    <div className='grid place-items-center'>
      {title || <p>Are you sure? 🤔</p>}

      <div className='flex space-x-4 mt-4 text-sm'>
        <button
          onClick={proceed}
          className='py-2 px-4 bg-red-600 hover:bg-red-600/90 border border-primary rounded text-white w-24'
          type='button'
        >
          Proceed
        </button>
        <button
          onClick={dismiss}
          className='py-2 px-4 bg-gray-200 hover:bg-gray-200/90 border border-primary rounded w-24'
          type='button'
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default Popup;
