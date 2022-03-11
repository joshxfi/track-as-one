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
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import { doc, getDoc, setDoc } from 'firebase/firestore';

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

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(() => auth.currentUser);
  const { push, asPath } = useRouter();

  const [userLoading, setUserLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({} as IUser);

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
        const { uid, email, metadata, photoURL } = _user.user;
        const userTag = `user:${nanoid(5)}`;

        const payload: IUser = {
          userTag,
          photoURL,
          invites: [],
          dateJoined: metadata.creationTime,
          username: email?.split('@')[0].toLowerCase(),
        };

        await setDoc(doc(db, 'users', uid), payload);
      }

      push('/home');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setDataLoading(() => true);
    const getUserData = async () => {
      if (user) {
        const res = await getDoc(doc(db, 'users', user.uid));
        setData({ ...res.data(), id: res.id } as IUser);

        if (asPath === '/') push('/home');
      }

      setDataLoading(() => false);
    };

    getUserData();
  }, [user]);

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
