import { AxiosPromise } from 'axios';

import request from '@/utils/request';
import { Comment } from '@/prototypes/comment';
import { ServerResponse } from '@/prototypes/response';


export function createComment(comment: Comment): AxiosPromise<ServerResponse<Comment>> {
  return request({ url: '/comment', method: 'post', data: comment });
}

export function updatePost(id: number, comment: Comment): AxiosPromise<ServerResponse<Comment>> {
  return request({ url: `/comment/${id}`, method: 'patch', data: comment });
}

export function deletePost(id: number): AxiosPromise<ServerResponse<Comment>> {
  return request({ url: `/comment/${id}`, method: 'delete' });
}
