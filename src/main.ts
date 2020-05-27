import Vue from 'vue';
import { Menu, Submenu, MenuItem } from 'element-ui';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
