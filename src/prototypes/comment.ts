import { User } from './user';

export interface Comment {
  id: number;
  title: string;
  content: string;
  postID: number;
  userID: number;
  parentID?: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  author?: User;
  comments?: Comment[];
}
