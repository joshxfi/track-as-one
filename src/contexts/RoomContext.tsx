import React, { createContext, useContext, useMemo } from 'react';
import { collection, orderBy, query } from 'firebase/firestore';
import { useCol, useNextQuery } from '@/hooks';
import { db } from '@/config/firebase';
import { useRoom } from '@/services';
import { Layout } from '@/components';

interface RoomContextValues {
  room: IRoom;
  roomId?: string;
  tasks?: ITask[];
}

const RoomContext = createContext({} as RoomContextValues);

const useRoomContext = () => {
  return useContext(RoomContext);
};

const RoomProvider: React.FC = ({ children }) => {
  const roomId = useNextQuery('id');
  const [room, loading] = useRoom(roomId);

  const [tasks] = useCol<ITask>(
    query(collection(db, `rooms/${roomId}/tasks`), orderBy('dateAdded', 'desc'))
  );

  const contextValues = useMemo(
    () => ({ room, tasks, roomId }),
    [room, tasks, roomId]
  );

  return (
    <RoomContext.Provider value={contextValues}>
      <Layout loaders={[loading]}>{children}</Layout>
    </RoomContext.Provider>
  );
};

export { useRoomContext, RoomProvider };
