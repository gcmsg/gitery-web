<template>
  <div class="about">
    <h1>This is an about page</h1>
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
