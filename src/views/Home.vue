<template>
  <div>
    <PostCard
      v-for="post in posts"
      :post="post"
      :key="post.id"
      @pressed="onPostCardPressed"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HomeModule from '@/store/modules/home';
import PostCard from '@/components/PostCard.vue';

@Component({
  name: 'home',
  components: {
    PostCard,
  },
})
export default class extends Vue {
  get posts() {
    return HomeModule.posts;
  }

  created() {
    this.getPosts();
  }

  private async getPosts() {
    await HomeModule.GetLatestPosts();
  }

  private onPostCardPressed() {
    this.$router.push('/post');
  }
}
</script>

<style lang="scss" scoped>
</style>
