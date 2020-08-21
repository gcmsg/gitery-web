import { AxiosPromise } from 'axios';

import request from '@/utils/request';
import { Post } from '@/prototypes/post';
import { ServerResponse } from '@/prototypes/response';

export function getLatestPosts(): AxiosPromise<ServerResponse<Post[]>> {
  return request({ url: '/posts?limit=10&offset=0', method: 'get' });
}

export function getPost(id: number): AxiosPromise<ServerResponse<Post>> {
  return request({ url: `/posts/${id}`, method: 'get' });
}

export function createPost(post: Post): AxiosPromise<ServerResponse<Post>> {
  return request({ url: '/posts', method: 'post', data: post });
}

export function updatePost(post: Post): AxiosPromise<ServerResponse<Post>> {
  if (!post.id) return Promise.reject();
  return request({ url: `/posts/${post.id}`, method: 'patch', data: post });
}

export function deletePost(id: number): AxiosPromise<ServerResponse<Post>> {
  return request({ url: `/posts/${id}`, method: 'delete' });
}

export function getUserLikes(): AxiosPromise<ServerResponse<number[]>> {
  return request({ url: '/posts/likes', method: 'get' });
}

export function likePost(id: number): AxiosPromise<ServerResponse<undefined>> {
  return request({ url: '/posts/likes', method: 'post', data: { postID: id } });
}

export function cancelLike(id: number): AxiosPromise<ServerResponse<undefined>> {
  return request({ url: '/posts/likes', method: 'delete', data: { postID: id } });
}
