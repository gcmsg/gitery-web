<template>
  <el-container>
    <el-header>
      <NavigationBar
        :routes="routes"
        :isLoggedIn="isLoggedIn"
        :onLoginBtnPressed="onLoginBtnPressed"
      />
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RouteConfig } from 'vue-router';

import UserModule from '@/store/modules/user';
import NavigationBar from '@/components/NavigationBar.vue';
import HomeRoute from './router/home';
import AboutRoute from './router/about';

@Component({
  name: 'app',
  components: {
    NavigationBar,
  },
})
export default class extends Vue {
  private routes: RouteConfig[] = [HomeRoute, AboutRoute];

  // eslint-disable-next-line class-methods-use-this
  private created() {
    UserModule.LoadToken();
    console.log(this.$store.state.auth);
  }

  // eslint-disable-next-line class-methods-use-this
  get isLoggedIn() {
    return UserModule.isLoggedIn;
  }

  private onLoginBtnPressed() {
    this.$router.push('/login');
  }
}
</script>

<style lang="scss">
html {
  font-family: 'Chinese Quote', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue',
    Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  color: #333;
  margin: 0;
  padding: 0;
  width: 100%;
  * {
    box-sizing: border-box;
    outline: 0;
  }
  body {
    margin: 0;
  }
}
</style>
