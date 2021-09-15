import React from 'react';
import doodle from '../public/assets/doodle.svg';
import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaDiscord } from 'react-icons/fa';
import { FaInstagramSquare } from 'react-icons/fa';

const socialIcons = [FaGithub, FaLinkedin, FaDiscord, FaInstagramSquare];

export const Footer: React.FC = () => {
  return (
    <footer className='absolute bottom-0 w-full'>
      <div className='relative overflow-hidden h-[200px]'>
        <Image src={doodle} alt='doodle pattern' />
        <div className='absolute bottom-0 h-[100px] w-full bg-primary text-xs text-secondary flex flex-col justify-center items-center'>
          <div className='flex text-base'>
            {socialIcons.map(Icon => (
              <a key={Icon.toString()} className='mx-3' href='#'>
                <Icon />
              </a>
            ))}
          </div>

          <div className='my-3'>
            <a className='mx-3' href='#'>
              about
            </a>
            <a className='mx-3' href='#'>
              report bugs
            </a>
            <a className='mx-3' href='#'>
              portfolio
            </a>
          </div>
          <p>Copyright © 2021 Josh Daniel • All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};
