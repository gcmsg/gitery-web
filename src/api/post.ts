import { AxiosPromise } from 'axios';

import request from '@/utils/request';
import { Post } from '@/prototypes/post';
import { ServerResponse } from '@/prototypes/response';

export function getLatestPosts(): AxiosPromise<ServerResponse<Post[]>> {
  return request({ url: '/post?limit=10&offset=0', method: 'get' });
}

export function getPost(id: number): AxiosPromise<ServerResponse<Post>> {
  return request({ url: `/post/${id}`, method: 'get' });
}

export function createPost(post: Post): AxiosPromise<ServerResponse<Post>> {
  return request({ url: '/post', method: 'post', data: post });
}

export function updatePost(post: Post): AxiosPromise<ServerResponse<Post>> {
  if (!post.id) return Promise.reject();
  return request({ url: `/post/${post.id}`, method: 'patch', data: post });
}

export function deletePost(id: number): AxiosPromise<ServerResponse<Post>> {
  return request({ url: `/post/${id}`, method: 'delete' });
}
