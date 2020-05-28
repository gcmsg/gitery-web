import { User } from './user';

export interface Comment {
  id: number;
  title: string;
  content: string;
  postID: number;
  userID: number;
  createdAt: number;
  updatedAt: number;
  author?: User;
}
