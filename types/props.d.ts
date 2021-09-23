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
  href?: string;
  type?: button;
  Icon: IconType;
}


interface RoomTaskProps {
  task: TaskList;
  delTask: (id: string) => void;
}


interface RoomNavProps {
  room?: RoomList;
}

interface ListRoomsProps {
  room: RoomList;
}

interface NoRoomsProps {
  desc: string;
  href: string;
}