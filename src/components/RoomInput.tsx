import React from 'react';
import { IconType } from 'react-icons';
import { useRouter } from 'next/router';
import { IoIosArrowBack } from 'react-icons/io';

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
  Icon?: IconType;
  btnLabel: string;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const RoomInput = ({ Icon, btnLabel, onSubmit, ...rest }: RoomInputProps) => {
  const { back } = useRouter();

  return (
    <>
      <Header title='trackAsOne' />
      <form
        onSubmit={onSubmit}
        className='flex w-full flex-col items-center justify-center'
      >
        <Input {...rest} required />

        <div className='mt-4 flex space-x-1'>
          <Button
            type='button'
            onClick={back}
            Icon={IoIosArrowBack}
            className='btn-ring h-[40px] rounded-l-[36px] rounded-r bg-primary px-2'
            iconStyles='text-secondary text-xl'
          />
          <Button
            name={btnLabel}
            type='submit'
            className='btn-ring mb-3 flex h-[40px] w-full items-center rounded-l rounded-r-[36px] bg-primary px-5 text-sm text-f9'
            Icon={Icon}
            iconStyles='text-secondary text-lg'
          />
        </div>
      </form>
    </>
  );
};

export default RoomInput;
