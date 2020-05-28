<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item v-for="route in routes" :key="route.key" :index="route.key">
      <router-link :to="route.path">{{route.name}}</router-link>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Route } from '@/prototypes/route';

@Component
export default class NavigationBar extends Vue {
  @Prop() routes!: Route[];

  private activeIndex = this.routes[0].name;

  private handleSelect(key: string, keyPath: string) {
    console.log(key, keyPath, this.activeIndex);
  }
}
</script>
