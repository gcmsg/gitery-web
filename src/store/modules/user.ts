import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import router from '@/router'
import store from '@/store'

export interface IUserState {
    email: string
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
    public email: string = ''
}

export const UserModule = getModule(User)