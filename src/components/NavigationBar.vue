<template>
  <el-menu :default-active="defaultActiveIndex" mode="horizontal" @select="handleSelect">
    <el-menu-item v-for="route in routes" :key="route.path" :index="route.path">
      <router-link :to="route.path">{{route.name}}</router-link>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { RouteConfig } from 'vue-router';

@Component
export default class NavigationBar extends Vue {
  @Prop() routes!: RouteConfig[];

  private defaultActiveIndex = this.routes[0].path;

  private handleSelect(key: string, keyPath: string) {
    console.log(key, keyPath, this.defaultActiveIndex);
  }
}
</script>
