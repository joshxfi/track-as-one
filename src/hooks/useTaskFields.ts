import { useState } from 'react';

const useTaskFields = (task?: ITask) => {
  const [description, setDesc] = useState(task?.description ?? '');
  const [dueDate, setDueDate] = useState<Date | null>(
    task?.dueDate ? task.dueDate.toDate() : null
  );
  const [images, setImages] = useState<File[]>([]);
  const [url, setUrl] = useState(task?.url ?? '');
  const [section, setSection] = useState(task?.section ?? '');

  const props = {
    description,
    dueDate,
    images,
    url,
    section,
    setDesc,
    setDueDate,
    setImages,
    setUrl,
    setSection,
  };

  const reset = () => {
    setDesc(task?.description ?? '');
    setDueDate(task?.dueDate ? task.dueDate.toDate() : null);
    setImages([]);
    setUrl(task?.url ?? '');
    setSection(task?.section ?? '');
  };

  return { props, reset };
};

export default useTaskFields;
