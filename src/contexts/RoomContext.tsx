import React, { createContext, useContext, useMemo } from 'react';
import { collection, orderBy, query } from 'firebase/firestore';
import { useCol, useNextQuery } from '@/hooks';
import { db } from '@/config/firebase';
import { useRoom } from '@/services';
import { Layout } from '@/components';
import { useAuth } from './AuthContext';

interface RoomContextValues {
  room: IRoom;
  tasks?: ITask[];
  isAdmin: boolean;
  roomLoading: boolean;
  tasksLoading: boolean;
  roomSection: string;
}

const RoomContext = createContext({} as RoomContextValues);

const useRoomContext = () => {
  return useContext(RoomContext);
};

const RoomProvider: React.FC = ({ children }) => {
  const {
    data: { userTag },
  } = useAuth();
  const roomId = useNextQuery('id');
  const roomSection = useNextQuery('section') ?? '';
  const [room, roomLoading] = useRoom(roomId);

  const [tasks, tasksLoading] = useCol<ITask>(
    query(collection(db, `rooms/${roomId}/tasks`), orderBy('dateAdded', 'desc'))
  );

  const isAdmin = useMemo(
    () => room.creator === userTag || room.admin?.includes(userTag),
    [room]
  );

  const contextValues = useMemo(
    () => ({ room, tasks, isAdmin, roomLoading, tasksLoading, roomSection }),
    [room, tasks, roomLoading, tasksLoading, roomSection]
  );

  return (
    <RoomContext.Provider value={contextValues}>
      <Layout loaders={[tasksLoading]}>{children}</Layout>
    </RoomContext.Provider>
  );
};

export { useRoomContext, RoomProvider };
