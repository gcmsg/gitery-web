import { RouteConfig } from 'vue-router';

const route: RouteConfig = {
  path: '/',
  name: 'Home',
  component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
};

export default route;
