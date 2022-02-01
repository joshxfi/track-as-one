import React from 'react';
import { useRouter } from 'next/router';
import { IconType } from 'react-icons';

interface SettingBtnProps {
  route?: string;
  label: string;
  tab?: boolean;
  Icon: IconType;
}

const MenuBtn = ({ route, tab, label, Icon }: SettingBtnProps) => {
  const { push, query: q } = useRouter();
  const query = route ? { ...q, tab: route } : { id: q.id, tab: [] };

  return (
    <button
      className='flex items-center w-full px-4 py-2 text-gray-700 transition-colors rounded hover:text-black hover:bg-gray-200 space-x-3 cursor-pointer'
      type='button'
      onClick={() => push(tab ? { query } : `/${route}`)}
    >
      <Icon />
      <a>{label}</a>
    </button>
  );
};

export default MenuBtn;
