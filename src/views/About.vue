<template>
  <div class="about">
    <img alt="Vue logo" src="../assets/logo.png" />
    <About name="world" initialEnthusiasm="5" />
  </div>
</template>

<script>
// @ is an alias to /src
import About from '@/components/About.vue';

export default {
  name: 'Home',
  components: {
    About,
  },
};
</script>
