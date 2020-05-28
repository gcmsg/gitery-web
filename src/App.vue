<template>
  <div id="app">
    <NavigationBar :routes="routes" />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavigationBar from '@/components/NavigationBar.vue';
import { Route } from '@/prototypes/route';

@Component({
  name: 'Home',
  components: {
    NavigationBar,
  },
})
export default class extends Vue {
  private routes: Route[] = [
    { key: 'home', path: '/', name: 'Home' },
    { key: 'about', path: '/about', name: 'About' },
  ];
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
