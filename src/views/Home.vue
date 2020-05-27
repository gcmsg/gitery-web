<template>
  <div class="home">
    <NavigationBar />
    <div v-for="post in posts" v-bind:key="post.id">
      <h6 v-text="post.title" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavigationBar from '@/components/NavigationBar.vue';
import { Post } from '@/prototypes/post';
import { getRecentPosts } from '@/api/post';

@Component({
  name: 'Home',
  components: {
    NavigationBar,
  },
})
export default class extends Vue {
  private posts: Post[] = [];

  created() {
    this.getPosts();
  }

  private async getPosts() {
    const { data } = await getRecentPosts();
    if (data.ok) {
      this.posts = data.data;
    } else {
      // alert error
    }
  }
}
</script>
