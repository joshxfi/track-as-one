interface UserList {
  uid: string;
  name: string;
  profilePicture: string;
  roomsCreated: string;
  roomsJoined: string;
  dateJoined: Date;
}

interface RoomList {
  name: string;
  roomID: string;
  creator: string;
  admin: string;
  members: string;
  dateAdded: Date;
}

interface TaskList {
  id: string;
  roomID: string;
  description: string;
  addedBy: string;
  dateAdded: Date;
  dueDate: Date;
}
