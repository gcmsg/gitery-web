<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'post-layout',
  components: {},
})
export default class extends Vue {
}
</script>
