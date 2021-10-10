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
  desc: string;
  link: string;
  Icon: IconType;
}

interface ButtonProps {
  desc: string;
  href?: string;
  type?: button;
  Icon: IconType;
}


interface RoomTaskProps {
  task: TaskList;
  memberCount: number;
  delTask: (id: string) => void;
  doneTask: (id: string) => void;
}


interface RoomNavProps {
  room: RoomList;
}

interface ListRoomsProps {
  room: RoomList;
}

interface NoRoomsProps {
  desc: string;
  href: string;
}


interface InputProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder: string;
  max: number;
}

interface InfoBtnProps {
  desc: string;
  style?: string;
  handleClick: () => void;
}

interface ErrorProps {
  code?: string;
  info?: string;
}