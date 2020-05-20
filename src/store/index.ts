import Vue from 'vue'
import Vuex from 'vuex'
import { IPostState } from './modules/post'

Vue.use(Vuex)

export interface IRootState {
  post: IPostState
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({})
