<template>
  <div>
    <div>This is some Layout</div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'post',
  components: {},
})
export default class extends Vue {
}
</script>
