/* eslint-disable import/no-cycle */
import {
  VuexModule, Module, getModule,
} from 'vuex-module-decorators';
import store from '@/store';
import { PostState } from './post';

export interface HomeState {
  tags: string[];
  posts: PostState[];
  isLoading: boolean;
}

@Module({ dynamic: true, store, name: 'home' })
class HomeModule extends VuexModule implements HomeState {
  public tags: string[] = []

  public posts: PostState[] = []

  public isLoading = true
}

export default getModule(HomeModule);
