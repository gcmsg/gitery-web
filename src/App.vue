<template>
  <el-row
    type="flex"
    justify="center"
  >
    <el-col
      :xs="24"
      :md="20"
      :lg="16"
    >
      <el-container>
        <el-header>
          <NavigationBar
            :routes="routes"
            :isLoggedIn="isLoggedIn"
            :onLoginPressed="onLoginPressed"
            :onDropdownSelected="onDropdownSelected"
            :onComposePressed="onComposePressed"
          />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-col>
  </el-row>
</template>

<style lang="scss">
html {
  font-family: "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue",
    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
    .breadcrumb-wrapper {
      padding: 8px 15px;
    }
  }
}
</style>

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

  private created() {
    UserModule.LoadToken();
  }

  private get isLoggedIn() {
    return UserModule.isLoggedIn;
  }

  private onLoginPressed() {
    this.$router.push('/login');
  }

  private onComposePressed() {
    this.$router.push('/post/compose');
  }

  private onDropdownSelected(commend: string) {
    switch (commend) {
      case 'profile':
        if (UserModule.isLoggedIn) {
          this.$router.push('/profile');
        } else {
          this.onLoginPressed();
        }
        break;
      case 'logout':
        UserModule.SignOut();
        if (this.$router.currentRoute.path !== '/') {
          this.$router.replace('/');
        }
        break;
      default:
        break;
    }
  }
}
</script>
