/* eslint-disable import/no-cycle */
import {
  VuexModule, Module, getModule,
} from 'vuex-module-decorators';
import store from '@/store';

export interface UserState {
  email: string;
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements UserState {
  public email = ''
}

export const UserModule = getModule(User);
