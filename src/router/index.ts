import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import HomeRoute from './home';
import AboutRoute from './about';
import LoginRoute from './login';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  HomeRoute,
  AboutRoute,
  LoginRoute,
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
