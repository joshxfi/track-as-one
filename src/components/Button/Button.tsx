import React from 'react';
import { IconType } from 'react-icons';

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  name: string;
  Icon: IconType;
  iconStyles?: string;
}

const WelcomeBtn = ({ name, Icon, iconStyles, ...rest }: ButtonProps) => {
  return (
    // eslint-disable-next-line react/button-has-type
    <button {...rest}>
      <p className='mr-4'>{name}</p> <Icon className={`${iconStyles}`} />
    </button>
  );
};

export default WelcomeBtn;
