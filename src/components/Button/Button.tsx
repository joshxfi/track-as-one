import React from 'react';
import { IconType } from 'react-icons';

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  name?: string;
  Icon?: IconType;
  iconStyles?: string;
}

const Button = ({ name, Icon, iconStyles, ...rest }: ButtonProps) => {
  return (
    // eslint-disable-next-line react/button-has-type
    <button {...rest}>
      {name && <p className={Icon ? 'mr-4' : ''}>{name}</p>}
      {Icon && <Icon className={`${iconStyles}`} />}
    </button>
  );
};

export default Button;
