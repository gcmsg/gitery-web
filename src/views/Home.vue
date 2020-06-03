<template>
  <div>
    <el-card
      v-for="post in posts"
      v-bind:key="post.id"
      shadow="hover"
      class="box-card"
    >
      <div class="card-content">
        <h4>{{post.title}}</h4>
        <p>{{post.content}}</p>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Post } from '@/prototypes/post';
import { getRecentPosts } from '@/api/post';

@Component({
  name: 'home',
  components: {},
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
.box-card {
  margin: 15px 10px;
  .card-content {
    display: flex;
  }
}
</style>
