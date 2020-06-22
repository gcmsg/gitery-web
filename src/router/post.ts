import { RouteConfig } from 'vue-router';

const route: RouteConfig = {
  path: '/post',
  name: 'Post',
  component: () => import(/* webpackChunkName: "post" */ '@/views/Post/Layout.vue'),
  redirect: '/post/compose',
  children: [
    {
      path: ':id(\\d+)',
      component: () => import(/* webpackChunkName: "post-detail" */ '@/views/Post/Detail.vue'),
    },
    {
      path: 'compose',
      component: () => import(/* webpackChunkName: "post-compose" */ '@/views/Post/Compose.vue'),
    },
  ],
};

export default route;
