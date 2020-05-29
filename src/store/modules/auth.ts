/* eslint-disable import/no-cycle */
import {
  VuexModule, Module, getModule,
} from 'vuex-module-decorators';
import store from '@/store';

export interface AuthState {
  token?: string;
}

@Module({ dynamic: true, store, name: 'user' })
class Auth extends VuexModule implements AuthState {
  public token?: string
}

export const AuthModule = getModule(Auth);
