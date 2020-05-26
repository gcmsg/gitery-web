import request from '@/utils/request';
import { Post } from '@/prototypes/post';

export const getRecentPosts = () => request({ url: '/post?limit=10&offset=0', method: 'get' });

export const getPost = (id: number) => request({
  url: `/post/${id}`,
  method: 'get',
});

export const createPost = (post: Post) => request({
  url: '/post',
  method: 'post',
  data: post,
});

export const updatePost = (id: number, post: Post) => request({
  url: `/post/${id}`,
  method: 'patch',
  data: post,
});

export const deletePost = (id: number) => request({
  url: `/post/${id}`,
  method: 'delete',
});
