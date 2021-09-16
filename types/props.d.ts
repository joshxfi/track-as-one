interface Children {
  children: React.ReactNode;
}

interface NavBtnProps {
  method: string;
  onTap: () => void;
}

interface HeaderProps {
  title?: string;
  desc?: string;
}

interface HomepageButtonProps {
  name: string;
  link: string;
  Icon: IconType;
}

interface ButtonProps {
  desc: string;
  Icon: IconType;
}