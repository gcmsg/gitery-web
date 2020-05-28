<template>
  <div id="app">
    <el-container>
      <el-header>
        <NavigationBar :routes="routes" />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavigationBar from '@/components/NavigationBar.vue';
import { RouteConfig } from 'vue-router';
import { routes } from './router';

@Component({
  name: 'Home',
  components: {
    NavigationBar,
  },
})
export default class extends Vue {
  private routes: RouteConfig[] = routes;
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
