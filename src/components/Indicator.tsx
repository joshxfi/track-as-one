import React from 'react';

const Indicator = ({ className }: { className?: string }) => {
  return (
    <div
      className={`absolute ${
        className || 'top-1 right-1'
      } rounded-full bg-red-500 p-1`}
    />
  );
};

export default Indicator;
