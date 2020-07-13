/* eslint-disable import/no-cycle */
import Vue from 'vue';
import {
  VuexModule, Module, getModule, Action, Mutation,
} from 'vuex-module-decorators';
import store from '@/store';
import { Post } from '@/prototypes/post';
import { Comment } from '@/prototypes/comment';
import * as postApi from '@/api/post';
import * as commentApi from '@/api/comment';

export interface PostState {
  tags: string[];
  posts: Post[];
  isLoading: boolean;
  currentPost: Post;
}

@Module({ dynamic: true, store, name: 'post' })
class PostModule extends VuexModule implements PostState {
  public tags: string[] = []

  public posts: Post[] = []

  public isLoading = true

  public currentPost = {
    title: '',
    content: '',
  } as Post;

  @Mutation
  private SET_LOADING(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  @Mutation
  private UPDATE_POSTS(posts: Post[]) {
    this.posts = posts;
  }

  @Mutation
  private SELECT_POST(post: Post) {
    this.currentPost = post;
  }

  @Mutation
  private UPDATE_POST() {
    if (this.currentPost.id === undefined) return;
    const relatedIndex = this.posts.findIndex((post: Post) => post.id === this.currentPost.id);
    if (relatedIndex >= 0) {
      this.posts[relatedIndex] = this.currentPost;
    } else {
      this.posts.unshift(this.currentPost);
    }
  }

  @Mutation
  private DELETE_POST() {
    if (this.currentPost.id === undefined) return;
    this.posts = this.posts.filter((post: Post) => post.id !== this.currentPost.id);
  }

  @Mutation
  private CREATE_COMMENT(match: { comment: Comment; parent: Comment }) {
    const { comment, parent } = match;
    Vue.set(parent, 'comments', [...parent.comments || [], comment]);
  }

  @Mutation
  private EDIT_COMMENT(match: { comment: Comment; updatedComment: Comment }) {
    const { comment, updatedComment } = match;
    comment.content = updatedComment.content;
    comment.updatedAt = updatedComment.updatedAt;
  }

  @Action
  public async getLatestPosts() {
    this.SET_LOADING(true);
    const { data } = await postApi.getLatestPosts();
    this.SET_LOADING(false);
    if (data.ok) {
      const posts: Post[] = data.data;
      this.UPDATE_POSTS(posts);
    } else {
      // handle error
    }
  }

  @Action
  public async selectPost(post: Post) {
    this.SELECT_POST(post);
  }

  @Action
  public async getPostDetail(postID: number) {
    const { data } = await postApi.getPost(postID);

    if (data.ok) {
      const post: Post = data.data;
      this.SELECT_POST(post);
    } else {
      // handle error
    }
  }

  @Action
  public async createPost(draft: Post) {
    const { data } = await postApi.createPost(draft);
    if (data.ok) {
      const post: Post = data.data;
      this.SELECT_POST(post);
      this.UPDATE_POST();
    } else {
      // handle error
    }
  }

  @Action
  public async updatePost(draft: Post) {
    const { data } = await postApi.updatePost(draft);
    if (data.ok) {
      const post: Post = data.data;
      this.SELECT_POST(post);
      this.UPDATE_POST();
    } else {
      // handle error
    }
  }

  @Action
  public async deletePost() {
    const { data } = await postApi.deletePost(this.currentPost.id);
    if (data.ok) {
      this.DELETE_POST();
    }
  }

  @Action
  public async createComment(args: { userID: number; parent: Comment; content: string }) {
    const composed = {
      userID: args.userID,
      postID: args.parent.postID,
      parentID: args.parent.id,
      content: args.content,
    } as Comment;
    const { data } = await commentApi.createComment(composed);
    if (data.ok) {
      const comment: Comment = data.data;
      this.CREATE_COMMENT({ comment, parent: args.parent });
    }
  }

  @Action
  public async updateComment(args: { comment: Comment; content: string }) {
    const composed = {
      id: args.comment.id,
      content: args.content,
    } as Comment;
    const { data } = await commentApi.updateComment(composed);
    if (data.ok) {
      const updatedComment: Comment = data.data;
      this.EDIT_COMMENT({ comment: args.comment, updatedComment });
    }
  }
}

export default getModule(PostModule);
