<template>
  <div class="header">
    <div class="menu">
      <el-menu
        :default-active="$route.path"
        :router="true"
        mode="horizontal"
        @select="handleMenuSelect"
      >
        <el-menu-item
          v-for="route in routes"
          :route="route"
          :key="route.path"
          :index="route.path"
        >{{route.name}}</el-menu-item>
      </el-menu>
    </div>

    <div class="login">
      <el-button @click="onLoginBtnPressed" type="text">Login</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { RouteConfig } from 'vue-router';

@Component
export default class NavigationBar extends Vue {
  @Prop({ required: true }) routes!: RouteConfig[];

  @Prop({ required: true }) isLoggedIn!: boolean;

  @Prop({ required: true }) onLoginBtnPressed!: Function;

  private created() {
    console.log('isLoggedIn:', this.isLoggedIn);
  }

  private handleMenuSelect(key: string, keyPath: string) {
    console.log(key, keyPath, this.$route.path);
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  .menu {
    flex: 1;
  }
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 61px;
    border-bottom: solid 1px #e6e6e6;
  }
}
</style>
