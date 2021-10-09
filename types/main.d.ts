interface AuthContextValues {
  authUser: User | null;
  uid: string | undefined;
  displayName: string | null | undefined;
  photoURL: string | null | undefined;
  email: string | null | undefined;
  signIn: () => void;
  signOut: () => void;
  userLoading: boolean;
}

interface FirestoreContextValues {
  db: Firestore;
  userList: UserList[];
  roomList: RoomList[];
  userRef: CollectionReference<DocumentData>;
  roomRef: CollectionReference<DocumentData>;
  currentUser: UserList | undefined;
  dataLoading: boolean;
  setDataLoading: Dispatch<SetStateAction<boolean>>;
}
