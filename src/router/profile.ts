import { RouteConfig } from 'vue-router';

const route: RouteConfig = {
  path: '/profile',
  name: 'Profile',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "profile" */ '@/views/Profile.vue'),
};

export default route;
