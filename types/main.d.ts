interface AuthContextValues {
  authUser: User | null;
  uid: string | undefined;
  signIn: () => void;
  signOut: () => void;
}

interface FirestoreContextValues {
  db: Firestore;
  userList: UserList[];
  roomList: RoomList[];
  taskList: TaskList[];
  userRef: CollectionReference<DocumentData>;
  roomRef: CollectionReference<DocumentData>;
  taskRef: CollectionReference<DocumentData>;
}
