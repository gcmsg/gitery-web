/* eslint-disable import/no-cycle */
import {
  VuexModule, Module, getModule, Action, Mutation,
} from 'vuex-module-decorators';
import store from '@/store';
import { Post } from '@/prototypes/post';
import { Comment } from '@/prototypes/comment';
import { getLatestPosts, getPost, updatePost } from '@/api/post';

export interface PostState {
  tags: string[];
  posts: Post[];
  isLoading: boolean;
  currentPost: Post;
  draftPost: Post;
}

@Module({ dynamic: true, store, name: 'post' })
class PostModule extends VuexModule implements PostState {
  public tags: string[] = []

  public posts: Post[] = []

  public isLoading = true

  public currentPost = {} as Post;

  public draftPost = {} as Post;

  @Mutation
  private SET_LOADING(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  @Mutation
  private SET_POSTS(posts: Post[]) {
    this.posts = posts;
  }

  @Mutation
  private SET_CURRENT_POST(post: Post) {
    this.currentPost = post;
    this.draftPost = post;
  }

  @Mutation
  private SAVE_POST() {
    this.currentPost = this.draftPost;
  }

  @Mutation
  private SET_DRAFT_POST_TITLE(title: string) {
    if (this.draftPost) {
      this.draftPost.title = title;
    }
  }

  @Mutation
  private SET_DRAFT_POST_CONTENT(content: string) {
    if (this.draftPost) {
      this.draftPost.content = content;
    }
  }

  @Mutation
  private ADD_COMMENT_FOR_CURRENT_POST(comment: Comment) {
    if (this.currentPost) {
      if (this.currentPost.comments) {
        this.currentPost.comments.push(comment);
      } else {
        this.currentPost.comments = [comment];
      }
    }
  }

  @Action
  public async GetLatestPosts() {
    this.SET_LOADING(true);
    const { data } = await getLatestPosts();
    this.SET_LOADING(false);
    if (data.ok) {
      const posts: Post[] = data.data;
      this.SET_POSTS(posts);
    } else {
      // handle error
    }
  }

  @Action
  public async PresetCurrentPost(post: Post) {
    this.SET_CURRENT_POST(post);
  }

  @Action
  public async fetchPostDetail(postID: number) {
    const { data } = await getPost(postID);

    if (data.ok) {
      const post: Post = data.data;
      this.SET_CURRENT_POST(post);
    } else {
      // handle error
    }
  }

  @Action
  public updateDraftPostTitle(title: string) {
    this.SET_DRAFT_POST_TITLE(title);
  }

  @Action
  public updateDraftPostContent(Content: string) {
    this.SET_DRAFT_POST_CONTENT(Content);
  }

  @Action
  public async syncPostUpdate() {
    const { data } = await updatePost(this.currentPost);
    if (data.ok) {
      this.SAVE_POST();
      // const post: Post = data.data;
      // notify success
      console.log('update post success');
    } else {
      // handle error
    }
  }
}

export default getModule(PostModule);
