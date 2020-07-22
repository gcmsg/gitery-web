/* eslint-disable import/no-cycle */
import Vue from 'vue';
import Vuex from 'vuex';

import { UserState } from './modules/user';
import { PostState } from './modules/post';
import { ErrorState } from './modules/error';

Vue.use(Vuex);
export interface RootState {
  user: UserState;
  post: PostState;
  error: ErrorState;
}
// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<RootState>({});
