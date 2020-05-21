import Vue from 'vue'
import Vuex from 'vuex'
import { IPostState } from './modules/post'
import { IHomeState } from './modules/home'
import { IUserState } from './modules/user'

Vue.use(Vuex)

export interface IRootState {
  home: IHomeState
  user: IUserState
  post: IPostState
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({})
