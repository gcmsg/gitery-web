import { RouteConfig } from 'vue-router';

const route: RouteConfig = {
  path: '/post',
  name: 'Post',
  component: () => import(/* webpackChunkName: "home" */ '../views/Post.vue'),
};

export default route;
