<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png" />
    <About :name="name" :initialEnthusiasm="initialEnthusiasm" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import About from '@/components/About.vue';

@Component({
  name: 'about',
  components: {
    About,
  },
})
export default class extends Vue {
  private name = 'world';

  private initialEnthusiasm = 5;
}
</script>
