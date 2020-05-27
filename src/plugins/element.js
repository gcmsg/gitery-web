import Vue from 'vue';
import { Menu, Submenu, MenuItem } from 'element-ui';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';

locale.use(lang);

Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
