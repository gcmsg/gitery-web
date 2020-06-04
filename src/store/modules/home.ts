/* eslint-disable import/no-cycle */
import {
  VuexModule, Module, getModule, Action, Mutation,
} from 'vuex-module-decorators';
import store from '@/store';
import { Post } from '@/prototypes/post';
import { getLatestPosts } from '@/api/post';

export interface HomeState {
  tags: string[];
  posts: Post[];
  isLoading: boolean;
}

@Module({ dynamic: true, store, name: 'home' })
class HomeModule extends VuexModule implements HomeState {
  public tags: string[] = []

  public posts: Post[] = []

  public isLoading = true

  @Mutation
  private SET_LOADING(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  @Mutation
  private SET_POSTS(posts: Post[]) {
    this.posts = posts;
  }

  @Action
  public async GetLatestPosts() {
    this.SET_LOADING(true);
    const { data } = await getLatestPosts();
    this.SET_LOADING(false);
    if (data.ok) {
      const posts: Post[] = data.data;
      this.SET_POSTS(posts);
    } else {
      // handle error
    }
  }
}

export default getModule(HomeModule);
