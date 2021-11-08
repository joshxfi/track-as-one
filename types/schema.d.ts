interface UserList {
  id?: string;
  username?: string;
  userTag: string;
  displayName?: string;
  photoURL?: string | null;
  email?: string | null;
  roomsCreated: string[];
  roomsJoined: string[];
  invites: string[];
  dateJoined: any;
}

interface RoomList {
  name: string;
  roomID: string;
  creator: string | undefined | null;
  admin: string[];
  members: string[];
  dateAdded: string | undefined;
  requests: string[];
}

interface TaskList {
  id?: string;
  description: string;
  addedBy: string | undefined | null;
  dateAdded: string;
  dueDate: string | undefined;
  completedBy: string[];
}
