/* eslint-disable no-console */
import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import {
  getAdditionalUserInfo,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { useDoc } from '@/hooks';
import { useRouter } from 'next/router';
import { auth, db } from '../config/firebase';

interface AuthContextValues {
  user: User | null;
  signIn: () => void;
  signOut: () => void;
  loading: boolean;
  data: IUser;
}

const AuthContext = createContext<AuthContextValues>({} as AuthContextValues);

const useAuth = () => {
  const data = useContext(AuthContext);
  return { ...data };
};

const userPayload = (user: User) => {
  const { email, metadata, photoURL } = user;
  const userTag = `user:${nanoid(5)}`;

  return {
    userTag,
    photoURL,
    invites: [],
    dateJoined: metadata.creationTime,
    username:
      email && email.split('@')[0].split('').length > 12
        ? email?.split('@')[0].substring(0, 12)
        : email?.split('@')[0],
  };
};

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(() => auth.currentUser);
  const { push, asPath } = useRouter();

  const [userLoading, setUserLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUserLoading(() => true);
    const unsub = auth.onAuthStateChanged((_user) => {
      if (_user) setUser(_user);
      else setUser(null);
      setUserLoading(() => false);
    });

    return unsub;
  }, []);

  const signIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const _user = await signInWithPopup(auth, provider);
      const moreInfo = getAdditionalUserInfo(_user);

      if (moreInfo?.isNewUser) {
        await setDoc(doc(db, 'users', _user.user.uid), userPayload(_user.user));
      }

      push('/home');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const checkUserDocument = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (!userDoc.exists) {
          await setDoc(doc(db, 'users', user.uid), userPayload(user));
        }
      }
    };

    checkUserDocument();

    if (user && asPath === '/') push('/home');
  }, [user]);

  const [data, dataLoading] = useDoc<IUser>(doc(db, `users/${user?.uid}`));

  useEffect(() => {
    if (userLoading || dataLoading) setLoading(() => true);
    else setLoading(() => false);
  }, [userLoading, dataLoading]);

  const signOut = async () => {
    try {
      await auth.signOut();
      push('/');
    } catch (err) {
      console.log(err);
    }
  };

  const contextValues = useMemo(
    () => ({ user, signIn, signOut, data, loading }),
    [user, signIn, signOut, data, loading]
  );

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
