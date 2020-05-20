import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import router from '@/router'
import store from '@/store'
import { IPostState } from './post'

export interface IHomeState {
    tags: []
    posts: IPostState[]
    isLoading: boolean
}