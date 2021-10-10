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

interface ButtonProps {
  styles?: string;
  desc: string;
  Icon: IconType;
  iconSize?: string;
  handleClick?: () => void;
}

interface LinkButtonProps {
  desc: string;
  href?: string;
  type?: any;
  Icon: IconType;
}

interface Children {
  children: React.ReactNode;
}