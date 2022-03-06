import { FaDiscord, FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

export const defaultPic =
  'https://firebasestorage.googleapis.com/v0/b/trackas1.appspot.com/o/default%2Ffallback.png?alt=media&token=83a287b4-4513-437b-890c-dc17b224cbbf';

export const aboutPage = {
  body1:
    'I never really had a to-do list for checking homework. I usually check for activities on MS Teams, ELMS, and I would scroll up on our messenger group chat that is cluttered with unrelated convos until I find the instruction our teacher gave us. Some students ask on the group chat about what assignments your class has. Eventually, it will get covered with convos and another one of your classmates will ask again. This is so inefficient and kind of annoying. That is why I built this web app. My goal was to build a to-do list that you can share with your friends and classmates so you only need to check one platform for your assignments.',

  body2: [
    'Notifications API',
    'Footer Links',
    'Edit Profile',
    'Room Admins',
    'Task Metadata',
    'Images on Tasks',
  ],
};

export const landingPage = {
  body1:
    'Every now and then, someone would pop in the group chat and say: "What assignments do we have? When is it due?" With this web app, you can track tasks collaboratively with your peers!',

  body2:
    'trackAsOne is a responsive web-based app that enables students to track homework & activities together with their friends or classmates. Forgot about a homework? Your friends got your back!',

  body3:
    "Tasks given by teachers are usually on different platforms. Few examples are Messenger and MS Teams. The problem is that they are usually cluttered with conversations making it hard to scroll back and you have to check multiple platforms just to make sure you won't miss an assignment.",
};

export const socials = [
  { Icon: FaGithub, link: 'https://github.com/joshxfi' },
  { Icon: FaLinkedin, link: 'https://ph.linkedin.com/in/joshdanielb' },
  { Icon: FaDiscord, link: '#' },
  { Icon: FaTwitter, link: 'https://twitter.com/joshxfi' },
];

export const urlRegExp =
  // eslint-disable-next-line no-useless-escape
  /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
