import React from 'react';
import { IconType } from 'react-icons';

import { Header, Input } from '.';
import { Button } from './Button';

interface RoomInputProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    'onSubmit'
  > {
  title: string;
  Icon: IconType;
  btnLabel: string;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const RoomInput = ({
  title,
  Icon,
  btnLabel,
  onSubmit,
  ...rest
}: RoomInputProps) => {
  return (
    <>
      <Header title={title} />
      <form
        onSubmit={onSubmit}
        className='flex w-full flex-col items-center justify-center'
      >
        <Input {...rest} required />

        <div className='mx-auto mt-2 inline-block'>
          <Button
            name={btnLabel}
            type='submit'
            className='btn btn-ring'
            iconStyles='text-secondary text-xl'
            Icon={Icon}
          />
        </div>
      </form>
    </>
  );
};

export default RoomInput;
