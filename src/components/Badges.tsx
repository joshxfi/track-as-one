import React from 'react';
import Tippy from '@tippyjs/react';
import { _badges } from '@/utils/constants';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'tippy.js/dist/tippy.css';

const style = (role: IRoles) => {
  switch (role) {
    case 'Founder':
      return 'text-lg text-blue-500';

    case 'Contributor':
      return 'text-green-500';

    case 'Beta Tester':
      return 'text-pink-500';

    default:
      return 'text-amber-500';
  }
};

const Badges = ({ roles }: { roles?: IRoles[] }) => {
  return (
    <div className='absolute top-0 -right-[105px] flex w-[100px] items-center space-x-[2px]'>
      {_badges.map(({ role, Icon }) => {
        return (
          roles?.includes(role) && (
            <Tippy
              key={role}
              content={role === 'OG' ? 'Pre-v1.1.0 User' : role}
            >
              <div className={style(role)}>
                <Icon />
              </div>
            </Tippy>
          )
        );
      })}
    </div>
  );
};

export default Badges;
