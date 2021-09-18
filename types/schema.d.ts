interface UserList {
  uid: string;
  name: string;
  profilePicture: string;
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
