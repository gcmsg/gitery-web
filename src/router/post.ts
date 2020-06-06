import { RouteConfig } from 'vue-router';

const route: RouteConfig = {
  path: '/post',
  name: 'Post',
  component: () => import(/* webpackChunkName: "post" */ '../views/Post/index.vue'),
  children: [
    {
      path: ':id(\\d+)',
      name: 'PostView',
      component: () => import('../views/Post/PostView.vue'),
    },
  ],
};

export default route;
