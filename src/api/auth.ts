import { AxiosPromise } from 'axios';

import request from '@/utils/request';
import { Auth, Token } from '@/prototypes/auth';
import { ServerResponse } from '@/prototypes/response';

export default function login(auth: Auth): AxiosPromise<ServerResponse<Token>> {
  return request({ url: '/auth', method: 'post', data: auth });
}
