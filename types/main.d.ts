interface ButtonProps {
  styles?: string;
  desc: string;
  Icon: IconType;
  iconSize?: string;
  handleClick?: () => void;
}

interface LinkButtonProps {
  desc: string;
  href?: string;
  type?: any;
  Icon: IconType;
}

interface Children {
  children: React.ReactNode;
}
