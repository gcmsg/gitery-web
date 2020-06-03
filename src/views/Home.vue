<template>
  <div>
    <PostCard v-for="post in posts" :post="post" :key="post.id" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Post } from '@/prototypes/post';
import { getRecentPosts } from '@/api/post';
import PostCard from '@/components/PostCard.vue';

@Component({
  name: 'home',
  components: {
    PostCard,
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

<style lang="scss" scoped>
</style>
