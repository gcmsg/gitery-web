import { IComment } from './comment';
import { IUser } from './user';

export interface IPost {
    id: number
    title: string
    author: IUser
    content: string
    comments: IComment[]
}