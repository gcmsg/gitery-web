import { AxiosPromise } from 'axios';

import request from '@/utils/request';
import { Comment } from '@/prototypes/comment';
import { ServerResponse } from '@/prototypes/response';

export function createComment(comment: Comment): AxiosPromise<ServerResponse<Comment>> {
  return request({ url: '/comment', method: 'post', data: comment });
}

export function updateComment(comment: Comment): AxiosPromise<ServerResponse<Comment>> {
  return request({ url: `/comment/${comment.id}`, method: 'patch', data: comment });
}

export function deleteComment(id: number): AxiosPromise<ServerResponse<Comment>> {
  return request({ url: `/comment/${id}`, method: 'delete' });
}

export function getPostVotes(postID: number): AxiosPromise<ServerResponse<number[]>> {
  // eslint-disable-next-line @typescript-eslint/camelcase
  return request({ url: '/comment/vote', method: 'get', params: { post_id: postID } });
}

export function voteComment(id: number, vote: boolean): AxiosPromise<ServerResponse<undefined>> {
  return request({ url: '/comment/vote', method: 'post', data: { commentID: id, vote } });
}

export function cancelVote(id: number): AxiosPromise<ServerResponse<undefined>> {
  return request({ url: '/comment/vote', method: 'delete', data: { commentID: id } });
}
