<template>
  <div>Compose</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'post-compose',
  components: {},
})
export default class extends Vue {
  private created() {
    console.log('compose');
  }
}
</script>
