/* eslint-disable import/no-cycle */
import {
  VuexModule, Module, getModule, Action, Mutation,
} from 'vuex-module-decorators';
import store from '@/store';
import { Post } from '@/prototypes/post';
import { Comment } from '@/prototypes/comment';
import {
  getLatestPosts, getPost, updatePost, createPost, deletePost,
} from '@/api/post';
import { updateComment } from '@/api/comment';

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
  private SET_POSTS(posts: Post[]) {
    this.posts = posts;
  }

  @Mutation
  private SET_CURRENT_POST(post: Post) {
    this.currentPost = post;
  }

  @Mutation
  private SYNC_UPDATE_TO_LIST() {
    if (this.currentPost.id === undefined) return;
    const relatedIndex = this.posts.findIndex((post: Post) => post.id === this.currentPost.id);
    if (relatedIndex >= 0) {
      this.posts[relatedIndex] = this.currentPost;
    } else {
      this.posts.unshift(this.currentPost);
    }
  }

  @Mutation
  private DELETE_POST_FROM_LIST() {
    if (this.currentPost.id === undefined) return;
    this.posts = this.posts.filter((post: Post) => post.id !== this.currentPost.id);
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

  @Mutation
  private EDIT_COMMENT(updateMatching: { comment: Comment; updatedComment: Comment }) {
    const { comment, updatedComment } = updateMatching;
    comment.content = updatedComment.content;
    comment.updatedAt = updatedComment.updatedAt;
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
  public async syncPostCreate(draft: Post) {
    const { data } = await createPost(draft);
    if (data.ok) {
      const post: Post = data.data;
      this.SET_CURRENT_POST(post);
      this.SYNC_UPDATE_TO_LIST();
    } else {
      // handle error
    }
  }

  @Action
  public async syncPostUpdate(draft: Post) {
    const { data } = await updatePost(draft);
    if (data.ok) {
      const post: Post = data.data;
      this.SET_CURRENT_POST(post);
      this.SYNC_UPDATE_TO_LIST();
    } else {
      // handle error
    }
  }

  @Action
  public async syncPostDelete() {
    const { data } = await deletePost(this.currentPost.id);
    if (data.ok) {
      this.DELETE_POST_FROM_LIST();
    }
  }

  @Action
  public async updateComment(args: { comment: Comment; content: string }) {
    const dataToUpdate = {
      id: args.comment.id,
      content: args.content,
    } as Comment;
    const { data } = await updateComment(dataToUpdate);
    if (data.ok) {
      const updatedComment: Comment = data.data;
      this.EDIT_COMMENT({ comment: args.comment, updatedComment });
    }
  }
}

export default getModule(PostModule);
