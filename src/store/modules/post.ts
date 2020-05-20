import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import router from '@/router'
import store from '@/store'

export interface IPostState {
    title: string
    author: {}
    content: string
    comments: {}[]
}

@Module({ dynamic: true, store, name: 'post' })
class Post extends VuexModule implements IPostState {
    public title: string = ''
    public author: object = {}
    public content: string = ''
    public comments: {}[] = []

    @Mutation
    private SET_TITLE(title: string) {
        this.title = title
    }

    @Mutation
    private SET_AUTHOR(author: object) {
        this.author = author
    }

    @Mutation
    private SET_CONTENT(content: string) {
        this.content = content
    }

    @Mutation
    private SET_COMMENTS(comments: {}[]) {
        this.comments = comments
    }

    @Action
    public async fetchPostDetail(postId: number) {
        // TODO fetch post from backend
        // this.SET_TITLE()
        // this.SET_AUTHOR()
        // this.SET_CONTENT()
        // this.SET_COMMENTS()
    }
}