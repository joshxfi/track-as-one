import React, { useContext, createContext, useState, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { User } from '@firebase/auth';
import { auth } from '../config/firebase';

interface AuthContextValues {
  authUser: User | null;
  uid: string | undefined;
  signIn: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValues>({} as AuthContextValues);

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider: React.FC = ({ children }) => {
  const [authUser, setAuthUser] = useState(() => auth.currentUser);

  const { uid } = authUser || {};

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(user => {
      user ? setAuthUser(user) : setAuthUser(null);
    });

    return unsub;
  });

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    auth.useDeviceLanguage();

    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.log(err);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (err) {
      console.log(err);
    }
  };

  const values: AuthContextValues = {
    authUser,
    uid,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { useAuth, AuthProvider };
