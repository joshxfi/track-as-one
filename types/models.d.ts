interface IUser {
  id?: string;
  username?: string;
  userTag: string;
  photoURL?: string | null;
  email?: string | null;
  roomsCreated: string[];
  roomsJoined: string[];
  invites: string[];
  dateJoined: any;
}

interface IRoom {
  id?: string;
  name: string;
  creator: string;
  admin: string[];
  members: string[];
  dateAdded: any;
  requests: string[];
}

interface ITask {
  id?: string;
  description: string;
  addedBy: string;
  dateAdded: any;
  dueDate?: any;
  completedBy: string[];
}
