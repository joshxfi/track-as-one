interface UserList {
  uid: string;
  userTag: string;
  displayName: string;
  photoURL: string;
  email: string;
  roomsCreated: string;
  roomsJoined: string;
  dateJoined: any;
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
