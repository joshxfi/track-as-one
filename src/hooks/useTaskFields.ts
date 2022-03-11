import { useMemo, useState } from 'react';
import { useRoomContext } from '@/contexts/RoomContext';

const useTaskFields = (taskId?: string) => {
  const { tasks } = useRoomContext();
  const task = taskId
    ? useMemo(() => tasks?.find((t) => t.id === taskId), [tasks, taskId])
    : undefined;

  const [description, setDesc] = useState(task?.description ?? '');
  const [dueDate, setDueDate] = useState<Date | null>(
    task?.dueDate ? task.dueDate.toDate() : null
  );
  const [images, setImages] = useState<File[]>([]);
  const [url, setUrl] = useState(task?.url ?? '');

  const props = {
    description,
    dueDate,
    images,
    url,
    setDesc,
    setDueDate,
    setImages,
    setUrl,
  };

  const reset = () => {
    setDesc(task?.description ?? '');
    setDueDate(task?.dueDate ? task.dueDate.toDate() : null);
    setImages([]);
    setUrl(task?.url ?? '');
  };

  return { props, reset };
};

export default useTaskFields;
