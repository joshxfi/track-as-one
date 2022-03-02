import React from 'react';
import { IconType } from 'react-icons';

import { Header, Input } from '.';
import { Button } from './Button';

interface RoomInputProps
  extends Pick<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    'onChange' | 'value' | 'placeholder'
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
        className='w-full flex justify-center flex-col items-center'
      >
        <Input {...rest} required minLength={5} maxLength={15} />

        <div className='inline-block mx-auto mt-2'>
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
