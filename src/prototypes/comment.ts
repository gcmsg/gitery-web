import { IUser } from './user';

export interface IComment {
    id: number
    title: string
    author: IUser
    content: string
    postId: number
}