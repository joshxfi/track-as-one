import { IconType } from 'react-icons';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import {
  HiBeaker,
  HiBadgeCheck,
  HiLightningBolt,
  HiChip,
} from 'react-icons/hi';

export const defaultPic =
  'https://firebasestorage.googleapis.com/v0/b/trackas1.appspot.com/o/default%2Ffallback.png?alt=media&token=83a287b4-4513-437b-890c-dc17b224cbbf';

export const socials = [
  { Icon: FaGithub, link: 'https://github.com/joshxfi' },
  { Icon: FaLinkedin, link: 'https://ph.linkedin.com/in/joshdanielb' },
  /* { Icon: FaDiscord, link: '#' }, */
  { Icon: FaTwitter, link: 'https://twitter.com/joshxfi' },
];

export const urlRegExp =
  // eslint-disable-next-line no-useless-escape
  /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

export const modalTransitions = {
  overlay: {
    enter: 'ease-out duration-300',
    enterFrom: 'opacity-0',
    enterTo: 'opacity-100',
    leave: 'ease-in duration-200',
    leaveFrom: 'opacity-100',
    leaveTo: 'opacity-0',
  },
  body: {
    enter: 'ease-out duration-300',
    enterFrom: 'opacity-0 scale-95',
    enterTo: 'opacity-100 scale-100',
    leave: 'ease-in duration-200',
    leaveFrom: 'opacity-100 scale-100',
    leaveTo: 'opacity-0 scale-95',
  },
};

export const _badges: { role: IRoles; Icon: IconType }[] = [
  {
    role: 'Verified',
    Icon: HiBadgeCheck,
  },
  {
    role: 'Contributor',
    Icon: HiChip,
  },
  {
    role: 'Beta Tester',
    Icon: HiBeaker,
  },
  {
    role: 'Early User',
    Icon: HiLightningBolt,
  },
];

interface IFooterLinks {
  title: string;
  links: { name: string; url?: string }[];
}

// Footer
export const footerLinks: IFooterLinks[] = [
  {
    title: 'Resources',
    links: [
      /* {
       *   name: 'The Project',
       * }, */
      {
        name: 'Privacy Policy',
      },
      {
        name: 'Code of Conduct',
      },
    ],
  },
  {
    title: 'Developer',
    links: [
      {
        name: 'GitHub',
        url: 'https://github.com/joshxfi',
      },
      {
        name: 'Contact',
        url: 'mailto:joshxfi.dev@gmail.com',
      },
      /* {
       *   name: 'About Me',
       * }, */
    ],
  },
  {
    title: 'Contribute',
    links: [
      {
        name: 'Report Bugs',
        url: 'https://github.com/joshxfi/trackAsOne/issues',
      },
      {
        name: 'Feature Request',
        url: 'https://github.com/joshxfi/trackAsOne/issues',
      },
    ],
  },
];
