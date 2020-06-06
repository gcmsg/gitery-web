import { RouteConfig } from 'vue-router';

const route: RouteConfig = {
  path: '/post',
  name: 'Post',
  // redirect: '/', // redirect if no child route match
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
