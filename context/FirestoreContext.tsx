import React, { useContext, createContext, useState, useEffect } from 'react';
import { onSnapshot, collection, query, orderBy } from 'firebase/firestore';
import {
  CollectionReference,
  DocumentData,
  Firestore,
} from '@firebase/firestore';
import { db } from '../config/firebase';

interface FirestoreContextValues {
  db: Firestore;
  userList: UserList[];
  roomList: RoomList[];
  taskList: TaskList[];
  userRef: CollectionReference<DocumentData>;
  roomRef: CollectionReference<DocumentData>;
  taskRef: CollectionReference<DocumentData>;
}

const FirestoreContext = createContext({});
const useFirestore = () => {
  return useContext(FirestoreContext);
};

const FirestoreProvider: React.FC = ({ children }) => {
  const [userList, setUserList] = useState<UserList[]>([]);
  const [roomList, setRoomList] = useState<RoomList[]>([]);
  const [taskList, setTaskList] = useState<TaskList[]>([]);

  const userRef = collection(db, 'userList');
  const roomRef = collection(db, 'roomList');
  const taskRef = collection(db, 'taskList');

  // fetch users
  useEffect(() => {
    const unsub = onSnapshot(userRef, docs => {
      let newUsers: UserList[] | any[] = [];

      docs.forEach(doc => {
        let task = { ...doc.data(), id: doc.id };
        newUsers = [task, ...newUsers];
      });

      setUserList(newUsers);
    });

    return unsub;
  }, [db]);

  // fetch rooms
  useEffect(() => {
    const unsub = onSnapshot(roomRef, docs => {
      let newRooms: RoomList[] | any[] = [];

      docs.forEach(doc => {
        let task = { ...doc.data(), id: doc.id };
        newRooms = [task, ...newRooms];
      });

      setRoomList(newRooms);
    });

    return unsub;
  }, [db]);

  // fetch tasks
  useEffect(() => {
    const unsub = onSnapshot(taskRef, docs => {
      let newTasks: TaskList[] | any[] = [];

      docs.forEach(doc => {
        let task = { ...doc.data(), id: doc.id };
        newTasks = [task, ...newTasks];
      });

      setTaskList(newTasks);
    });

    return unsub;
  }, [db]);

  const values: FirestoreContextValues = {
    db,
    userList,
    roomList,
    taskList,
    userRef,
    roomRef,
    taskRef,
  };

  return (
    <FirestoreContext.Provider value={values}>
      {children}
    </FirestoreContext.Provider>
  );
};

export { useFirestore, FirestoreProvider };
