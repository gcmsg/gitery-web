/* eslint-disable import/no-cycle */
import Vue from 'vue';
import Vuex from 'vuex';
import { PostState } from './modules/post';
import { HomeState } from './modules/home';
import { UserState } from './modules/user';

Vue.use(Vuex);
export interface RootState {
  home: HomeState;
  user: UserState;
  post: PostState;
}
// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<RootState>({});
