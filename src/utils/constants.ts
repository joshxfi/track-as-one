import { FaDiscord, FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

export const defaultPic =
  'https://firebasestorage.googleapis.com/v0/b/trackas1.appspot.com/o/default%2Fdefault.png?alt=media&token=5d2945ad-abc4-42d9-ab39-20408e5169bc';

export const aboutPage = {
  reason:
    'I never really had a to-do list for checking homework. I usually check for activities on MS Teams, ELMS, and I would scroll up on our messenger group chat that is cluttered with unrelated convos until I find the instruction our teacher gave us. Some students ask on the group chat about what assignments your class has. Eventually, it will get covered with convos and another one of your classmates will ask again. This is so inefficient and kind of annoying. That is why I built this web app. My goal was to build a to-do list that you can share with your friends and classmates so you only need to check one platform for your assignments.',

  futures: [
    'Notifications API',
    'Footer Links',
    'Edit Profile',
    'Room Admins',
    'Task Metadata',
    'Images on Tasks',
  ],
};

export const socials = [
  { Icon: FaGithub, link: 'https://github.com/joshxfi' },
  { Icon: FaLinkedin, link: 'https://ph.linkedin.com/in/joshdanielb' },
  { Icon: FaDiscord, link: '#' },
  { Icon: FaTwitter, link: 'https://twitter.com/joshxfi' },
];
