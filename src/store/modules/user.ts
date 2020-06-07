/* eslint-disable import/no-cycle */
import {
  VuexModule, Module, getModule, Action, Mutation,
} from 'vuex-module-decorators';
import Base64URL from '@/utils/base64URL';
import store from '@/store';
import { User } from '@/prototypes/user';
import { Login, JwtPayload } from '@/prototypes/auth';
import { getUser } from '@/api/user';
import signIn from '@/api/auth';


export interface UserState {
  token: string;
  user: User;
  isLoggedIn: boolean;
}

@Module({ dynamic: true, store, name: 'user' })
class UserModule extends VuexModule implements UserState {
  public token = ''

  public user = {} as User;

  get isLoggedIn() {
    return this.token !== '';
  }

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token;
  }

  @Mutation
  private REMOVE_TOKEN() {
    this.token = '';
  }

  @Mutation
  private SET_USER(user: User) {
    this.user = user;
  }

  @Mutation
  private REMOVE_USER() {
    this.user = {} as User;
  }

  @Action
  public async LoadToken() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.SET_TOKEN(token);
      // extract partial user info from JWT
      const encodedPayload = token.split('.')[1];
      const payload: JwtPayload = JSON.parse(Base64URL.decode(encodedPayload));
      this.SET_USER({ id: payload.pub.userID, email: payload.pub.email } as User);

      // fetch current user info from server
      const { data } = await getUser();
      if (data.ok) {
        const user: User = data.data;
        this.SET_USER(user);
      } else {
        // handle error
      }
    }
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
      // handle error
    }
  }

  @Action
  public SignOut() {
    localStorage.removeItem('token');
    this.REMOVE_TOKEN();
    this.REMOVE_USER();
  }
}

export default getModule(UserModule);
