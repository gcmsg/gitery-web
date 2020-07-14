<template>
  <div
    class="box-card"
    @click="$emit('pressed', post)"
  >
    <el-card v-bind:key="post.id">
      <div class="card-content">
        <h1>{{ post.title }}</h1>
        <div class="post-info">
          <h3>{{ post.author ? post.author.nickname : 'Anonymous' }}</h3>
          <h4>{{ updatedTime }}</h4>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.box-card {
  margin: 15px 10px;
  cursor: pointer;
  .card-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .post-info {
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-evenly;
      align-items: flex-end;
    }
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { formatUnixTimestamp } from '@/utils/format';
import { Post } from '@/prototypes/post';

@Component({
  name: 'PostCard',
})
export default class PostCard extends Vue {
  @Prop({ required: true }) post!: Post;

  private updatedDate = '';

  private updatedTime = '';

  private created() {
    this.updatedTime = formatUnixTimestamp(this.post.updatedAt);
  }
}
</script>
