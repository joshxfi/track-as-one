interface userList {
  uid: string;
  name: string;
  profilePicture: string;
  roomsCreated: string;
  roomsJoined: string;
  dateJoined: Date;
}

interface roomList {
  name: string;
  roomID: string;
  creator: string;
  admin: string;
  members: string;
  dateAdded: Date;
}

interface taskList {
  roomID: string;
  description: string;
  addedBy: string;
  dateAdded: Date;
  dueDate: Date;
}
