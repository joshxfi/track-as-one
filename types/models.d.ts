/* eslint-disable no-unused-vars */

type IRoles = 'Early User' | 'Beta Tester' | 'Contributor' | 'Verified';

interface IUser {
  id?: string;
  userTag: string;
  username?: string;
  photoURL?: string | null;
  email?: string | null;
  invites: string[];
  dateJoined: any;
  roles?: IRoles[];
}

interface IRoom {
  id?: string;
  name: string;
  creator: string;
  admin: string[];
  members: string[];
  dateAdded: any;
  requests: string[];
}

interface ITask {
  id?: string;
  description: string;
  addedBy: string;
  dateAdded: any;
  editedBy?: string;
  dateEdited?: any;
  url?: string;
  dueDate?: any;
  completedBy: string[];
  imgUrls?: string[];
}
