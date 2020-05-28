import { AxiosPromise } from 'axios';

import request from '@/utils/request';
import { User, Register } from '@/prototypes/user';
import { Post } from '@/prototypes/post';
import { ServerResponse } from '@/prototypes/response';

export function getUser(id?: number): AxiosPromise<ServerResponse<User>> {
  let url = '/user';
  if (id !== undefined) {
    url += `/${id}`;
  }
  return request({ url, method: 'get' });
}

export function createUser(register: Register): AxiosPromise<ServerResponse<User>> {
  return request({ url: '/user', method: 'post', data: register });
}

export function updateUser(user: User): AxiosPromise<ServerResponse<User>> {
  return request({ url: '/user', method: 'patch', data: user });
}

export function deleteUser(): AxiosPromise<ServerResponse<User>> {
  return request({ url: '/user', method: 'delete' });
}

export function getUserPosts(id?: number): AxiosPromise<ServerResponse<Post[]>> {
  let url = '/user/post';
  if (id !== undefined) {
    url = `/user/${id}/post`;
  }
  return request({ url, method: 'get' });
}
