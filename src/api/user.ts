import { AxiosPromise } from 'axios';

import request from '@/utils/request';
import { User, Register } from '@/prototypes/user';
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
