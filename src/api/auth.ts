import { AxiosPromise } from 'axios';

import request from '@/utils/request';
import { Login, Auth } from '@/prototypes/auth';
import { ServerResponse } from '@/prototypes/response';

export default function signIn(login: Login): AxiosPromise<ServerResponse<Auth>> {
  return request({ url: '/auth', method: 'post', data: login });
}
