import React from 'react';
import { useRouter } from 'next/router';
import { IconType } from 'react-icons';

interface SettingBtnProps {
  route?: string;
  label: string;
  tab?: string;
  Icon: IconType;
  href?: string;
  onClick?: () => void;
}

const MenuBtn = ({
  route,
  tab,
  label,
  Icon,
  href,
  onClick,
}: SettingBtnProps) => {
  const { push, query: q } = useRouter();
  const query = tab === 'room' ? { id: q.id, tab: [] } : { ...q, tab };

  return href ? (
    <a
      href={href}
      target='_blank'
      rel='noreferrer noopener'
      className='menu-btn'
    >
      <Icon />
      <p>{label}</p>
    </a>
  ) : (
    <button
      className='menu-btn'
      type='button'
      onClick={onClick || (() => push(tab ? { query } : `/${route}`))}
    >
      <Icon />
      <p>{label}</p>
    </button>
  );
};

export default MenuBtn;
