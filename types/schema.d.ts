interface UserList {
  uid: string | undefined;
  userTag: string | undefined | null;
  displayName: string | undefined | null;
  photoURL: string | undefined | null;
  email: string | undefined | null;
  roomsCreated: string[];
  roomsJoined: string[];
  invites: string[];
  dateJoined: Date;
}

interface RoomList {
  name: string;
  roomID: string;
  tasks: TaskList[];
  creator: string | undefined | nulll;
  admin: string[];
  members: string[];
  dateAdded: any;
}

interface TaskList {
  id: string;
  description: string;
  addedBy: string | undefined | null;
  dateAdded: Date;
  dueDate: string | undefined;
}
