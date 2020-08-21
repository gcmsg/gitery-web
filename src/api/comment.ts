import { AxiosPromise } from 'axios';

import request from '@/utils/request';
import { Comment, CommentVote } from '@/prototypes/comment';
import { ServerResponse } from '@/prototypes/response';

export function createComment(comment: Comment): AxiosPromise<ServerResponse<Comment>> {
  return request({ url: '/comments', method: 'post', data: comment });
}

export function updateComment(comment: Comment): AxiosPromise<ServerResponse<Comment>> {
  return request({ url: `/comments/${comment.id}`, method: 'patch', data: comment });
}

export function deleteComment(id: number): AxiosPromise<ServerResponse<Comment>> {
  return request({ url: `/comments/${id}`, method: 'delete' });
}

export function getPostVotes(postID: number): AxiosPromise<ServerResponse<CommentVote[]>> {
  // eslint-disable-next-line @typescript-eslint/camelcase
  return request({ url: '/comments/votes', method: 'get', params: { post_id: postID } });
}

export function voteComment(id: number, vote: boolean): AxiosPromise<ServerResponse<undefined>> {
  return request({ url: '/comments/votes', method: 'post', data: { commentID: id, vote } });
}

export function cancelVote(id: number): AxiosPromise<ServerResponse<undefined>> {
  return request({ url: '/comments/votes', method: 'delete', data: { commentID: id } });
}
