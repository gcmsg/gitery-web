import { RouteConfig } from 'vue-router';

const route: RouteConfig = {
  path: '/post/:id(\\d+)',
  name: 'Post',
  component: () => import(/* webpackChunkName: "post" */ '../views/Post.vue'),
};

export default route;
