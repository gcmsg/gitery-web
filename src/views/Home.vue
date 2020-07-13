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
import PostModule from '@/store/modules/post';
import PostCard from '@/components/Post/PostCard.vue';
import { Post } from '@/prototypes/post';

@Component({
  name: 'home',
  components: {
    PostCard,
  },
})
export default class extends Vue {
  private get posts() {
    return PostModule.posts;
  }

  private created() {
    PostModule.getLatestPosts();
  }

  private onPostCardPressed(post: Post) {
    PostModule.selectPost(post);
    this.$router.push(`/post/${post.id}`);
  }
}
</script>
