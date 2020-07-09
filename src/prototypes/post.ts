import { Comment } from './comment';
import { User } from './user';

export interface Post {
  id: number;
  title: string;
  content: string;
  userID: number;
  createdAt: number;
  updatedAt: number;
  comments?: Comment[];
  author?: User;
}
