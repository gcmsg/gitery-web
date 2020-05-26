<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';
import { Post } from '@/prototypes/post';
import { getRecentPosts } from '@/api/post';

@Component({
  name: 'Home',
  components: {
    HelloWorld,
  },
})
export default class extends Vue {
  private posts: Post[] = [];

  created() {
    this.getPosts();
  }

  private async getPosts() {
    const { data } = await getRecentPosts();
    console.log(data.data);
    console.log(data.ok);
    console.log(data.timestamp);
    this.posts = [];
  }
}
</script>
