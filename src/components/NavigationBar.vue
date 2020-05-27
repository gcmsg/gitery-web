<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="1">处理中心</el-menu-item>
    <el-menu-item index="2">我的工作台</el-menu-item>
    <el-menu-item index="3">消息中心</el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class NavigationBar extends Vue {
  private activeIndex = '1';

  private activeIndex2 = '1';

  private handleSelect(key: string, keyPath: string) {
    console.log(key, keyPath, this.activeIndex);
  }
}
</script>
