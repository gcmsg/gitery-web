/* eslint-disable import/no-cycle */
import Vue from 'vue';
import Vuex from 'vuex';

import { UserState } from './modules/user';
import { PostState } from './modules/post';

Vue.use(Vuex);
export interface RootState {
  user: UserState;
  post: PostState;
}
// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<RootState>({});
