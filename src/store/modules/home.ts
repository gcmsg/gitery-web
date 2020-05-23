import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import router from '@/router'
import store from '@/store'
import { IPostState } from './post'

export interface IHomeState {
    tags: string[]
    posts: IPostState[]
    isLoading: boolean
}

@Module({ dynamic: true, store, name: 'home' })
class Home extends VuexModule implements IHomeState {
    public tags: string[] = []
    public posts: IPostState[] = []
    public isLoading: boolean = true
}

export const HomeModule = getModule(Home)