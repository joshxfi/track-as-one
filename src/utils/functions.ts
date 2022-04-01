import { Dispatch, SetStateAction } from 'react';

export const dateWithTime = (date: Date) =>
  date.toLocaleDateString([], {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

export const userInRoom = (userTag: string, room: IRoom) => {
  return room.members.includes(userTag) || room.admin.includes(userTag);
};

export const isNearDeadline = (dueDate: any) => {
  const threeDaysFromNow = new Date();
  threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);

  return dueDate && dueDate.toDate() <= threeDaysFromNow;
};

export const isPastDeadline = (dueDate: any) => {
  const today = new Date();
  return today > dueDate?.toDate();
};

type SetBooleanState = Dispatch<SetStateAction<boolean>>;

export const timeoutModal = (
  prevModal: SetBooleanState,
  showModal: SetBooleanState
) => {
  prevModal(false);

  setTimeout(() => {
    showModal(true);
  }, 500);
};
