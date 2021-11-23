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
  id?: string;
  name: string;
  creator: string;
  admin: string[];
  members: string[];
  dateAdded: any;
  requests: string[];
}

interface TaskList {
  id?: string;
  description: string;
  addedBy: string;
  dateAdded: any;
  dueDate?: any;
  completedBy: string[];
}
