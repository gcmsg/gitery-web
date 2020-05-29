/* eslint-disable import/no-cycle */
import {
  VuexModule, Module, getModule, Action, Mutation,
} from 'vuex-module-decorators';
import store from '@/store';
import { User } from '@/prototypes/user';
import { Login } from '@/prototypes/auth';
import signIn from '@/api/auth';


export interface AuthState {
  token?: string;
  user?: User;
}

@Module({ dynamic: true, store, name: 'user' })
class Auth extends VuexModule implements AuthState {
  public token?: string

  public user?: User

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token;
  }

  @Mutation
  private SET_USER(user: User) {
    this.user = user;
  }

  @Action
  public async SignIn(login: Login) {
    const { data } = await signIn(login);
    if (data.ok) {
      const { token, user } = data.data;
      localStorage.setItem('token', token);
      this.SET_TOKEN(token);
      this.SET_USER(user);
    } else {
      // alert error
    }
  }
}

export const AuthModule = getModule(Auth);
