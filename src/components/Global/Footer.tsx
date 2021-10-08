import React from 'react'
import doodle from '../../../public/assets/doodle.svg'
import Image from 'next/image'
import { FaGithub } from 'react-icons/fa'
import { FaLinkedin } from 'react-icons/fa'
import { FaDiscord } from 'react-icons/fa'
import { FaInstagramSquare } from 'react-icons/fa'

const socialIcons = [FaGithub, FaLinkedin, FaDiscord, FaInstagramSquare]

export const Footer: React.FC = () => {
  return (
    <footer className='w-full'>
      <div className='w-full lg:hidden h-24 overflow-hidden'>
        <Image src={doodle} alt='doodle pattern' objectFit='contain' />
      </div>

      <div className='z-50 relative py-10 bg-primary text-sm text-f9 w-full'>
        <div className='container w-[85%] mx-auto'>
          <div className='flex justify-between'>
            <div className='hidden md:block'>
              <h1 className='font-bold text-[#e0e0e0] text-xl'>
                trackAs
                <span className='gradient-text'>One</span>
              </h1>
            </div>

            <div>
              <h1 className='footer-h1'>Project</h1>
              <div className='flex flex-col leading-5'>
                <a href='#'>About</a>
                <a href='#'>Terms</a>
                <a href='#'>Privacy</a>
                <a href='#'>Overview</a>
              </div>
            </div>

            <div>
              <h1 className='footer-h1'>Developer</h1>
              <div className='flex flex-col leading-5'>
                <a href='#'>About Me</a>
                <a href='#'>Contact</a>
                <a href='#'>Support</a>
              </div>
            </div>

            <div>
              <h1 className='footer-h1'>Resources</h1>
              <div className='flex flex-col leading-5'>
                <a href='#'>FAQs</a>
                <a href='#'>Data</a>
                <a href='#'>Tutorials</a>
                <a href='#'>Updates</a>
              </div>
            </div>

            <div className='hidden sm:block'>
              <h1 className='footer-h1'>Contribute</h1>
              <div className='flex flex-col leading-5'>
                <a href='#'>Report Bugs</a>
                <a href='#'>Feature Request</a>
                <a href='#'>Suggest Design</a>
              </div>
            </div>
          </div>

          <div className='sm:hidden mt-8'>
            <h1 className='footer-h1'>Contribute</h1>
            <div className='flex flex-col leading-5'>
              <a href='#'>Report Bugs</a>
              <a href='#'>Feature Request</a>
              <a href='#'>Suggest Design</a>
            </div>
          </div>

          <div className='w-full h-[1px] bg-gray-500 my-8'></div>

          <div className='md:flex-between md:flex-row mx-auto flex flex-col items-center'>
            <p className='text-secondary mb-4 md:mb-0'>
              Copyright © 2021 Josh Daniel
            </p>
            <div className='flex text-base lg:text-xl'>
              {socialIcons.map((Icon) => (
                <a
                  key={Icon.toString()}
                  className={Icon === FaInstagramSquare ? 'ml-3' : 'mx-3'}
                  href='#'
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
