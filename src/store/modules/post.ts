/* eslint-disable import/no-cycle */
import {
  VuexModule, Module, Action, Mutation, getModule,
} from 'vuex-module-decorators';
import store from '@/store';
import { Post } from '@/prototypes/post';
import { User } from '@/prototypes/user';
import { Comment } from '@/prototypes/comment';
import { getPost } from '@/api/post';

export interface PostState {
  post?: Post;
}

@Module({ dynamic: true, store, name: 'post' })
class PostModule extends VuexModule implements PostState {
  public post?: Post;

  @Mutation
  private LOAD_POST(post: Post) {
    this.post = post;
  }

  @Mutation
  private SET_TITLE(title: string) {
    if (this.post) {
      this.post.title = title;
    }
  }

  @Mutation
  private SET_AUTHOR(author: User) {
    if (this.post) {
      this.post.author = author;
    }
  }

  @Mutation
  private SET_CONTENT(content: string) {
    if (this.post) {
      this.post.content = content;
    }
  }

  @Mutation
  private ADD_COMMENTS(comment: Comment) {
    if (this.post) {
      if (this.post.comments) {
        this.post.comments.push(comment);
      } else {
        this.post.comments = [comment];
      }
    }
  }

  @Action
  public async fetchPostDetail(postID: number) {
    const { data } = await getPost(postID);
    if (data.ok) {
      const post = data.data;
      this.LOAD_POST(post);
    } else {
      // handle error
    }
  }
}

export default getModule(PostModule);
