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
