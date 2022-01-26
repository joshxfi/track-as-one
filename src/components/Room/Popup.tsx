import React from 'react';

interface PopupProps {
  title?: React.ReactNode;
  href?: string;
  proceed: () => void;
  dismiss: () => void;
}

const Popup = ({ title, href, proceed, dismiss }: PopupProps) => {
  return (
    <div className='grid place-items-center'>
      {title || <p>Are you sure? 🤔</p>}

      <div className='flex space-x-4 mt-4 text-sm'>
        {href ? (
          <a
            href={href}
            target='_blank'
            rel='noreferrer noopener'
            className='popup-proceed'
          >
            Proceed
          </a>
        ) : (
          <button onClick={proceed} className='popup-proceed' type='button'>
            Proceed
          </button>
        )}
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
