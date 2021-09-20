interface UserList {
  uid: string | undefined;
  userTag: string | undefined | null;
  displayName: string | undefined | null;
  photoURL: string | undefined | null;
  email: string | undefined | null;
  roomsCreated: string[];
  roomsJoined: string[];
}

interface RoomList {
  name: string;
  roomID: string;
  creator: string;
  admin: string;
  members: string;
  dateAdded: any;
}

interface TaskList {
  id: string;
  roomID: string;
  description: string;
  addedBy: string;
  dateAdded: any;
  dueDate: any;
}
