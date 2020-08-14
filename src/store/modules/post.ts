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
import UserModule from './user';

export interface PostState {
  tags: string[];
  posts: Post[];
  isLoading: boolean;
  currentPost: Post;
  currentVotesByUser: { [commentID: number]: boolean };
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

  public currentVotesByUser = {};

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
  private UPDATE_POST_LIST() {
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
  private CREATE_COMMENT(match: { comment: Comment; parent?: Comment }) {
    const { comment, parent } = match;
    if (parent) {
      Vue.set(parent, 'comments', [...parent.comments || [], comment]);
    } else {
      Vue.set(this.currentPost, 'comments', [...this.currentPost.comments || [], comment]);
    }
  }

  @Mutation
  private EDIT_COMMENT(match: { comment: Comment; updatedComment: Comment }) {
    const { comment, updatedComment } = match;
    comment.content = updatedComment.content;
    comment.updatedAt = updatedComment.updatedAt;
    comment.isDeleted = false;
  }

  @Mutation
  private DELETE_COMMENT(comment: Comment) {
    // eslint-disable-next-line no-param-reassign
    comment.isDeleted = true;
  }

  @Mutation
  private SET_CURRENT_VOTES_BY_USER(userVotes: { [commentID: number]: boolean }) {
    this.currentVotesByUser = userVotes;
  }

  @Mutation
  private VOTE_COMMENT(match: { comment: Comment; vote: boolean; voted?: boolean }) {
    const { comment, vote, voted } = match;
    if (vote) {
      comment.voteUp += 1;
      if (voted === false) {
        comment.voteDown -= 1;
      }
    } else {
      comment.voteDown += 1;
      if (voted) {
        comment.voteUp -= 1;
      }
    }
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
      this.UPDATE_POST_LIST();
    } else {
      // handle error
    }
  }

  @Action
  public async updatePost(draft: Post) {
    const { data } = await postApi.updatePost(draft);
    if (data.ok) {
      const post: Post = data.data;
      post.comments = this.currentPost.comments;
      post.author = this.currentPost.author;

      this.SELECT_POST(post);
      this.UPDATE_POST_LIST();
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
  public async createComment(args: { userID: number; postID: number; content: string; parent?: Comment }) {
    const composed = {
      userID: args.userID,
      postID: args.postID,
      parentID: args.parent?.id,
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

  @Action
  public async deleteComment(comment: Comment) {
    const { data } = await commentApi.deleteComment(comment.id);
    if (data.ok) {
      this.DELETE_COMMENT(comment);
    }
  }

  @Action
  public async getUserVotes(userID: number) {
    if (!UserModule.isLoggedIn) return;
    const { data } = await commentApi.getPostVotes(userID);
    if (data.ok) {
      const votes = data.data;
      const voteMap = {} as { [commentID: number]: boolean };
      for (let i = 0; i < votes.length; i += 1) {
        voteMap[votes[i].commentID] = votes[i].vote;
      }
      this.SET_CURRENT_VOTES_BY_USER(voteMap);
    }
  }

  @Action
  public async voteComment(comment: Comment, vote: boolean, voted?: boolean) {
    if (vote === voted) return;
    const { data } = await commentApi.voteComment(comment.id, vote);
    if (data.ok) {
      this.VOTE_COMMENT({ comment, vote, voted });
    }
  }
}

export default getModule(PostModule);
