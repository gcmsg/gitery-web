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
  voteUp?: number;
  voteDown?: number;
  author?: User;
  comments?: Comment[];
}
