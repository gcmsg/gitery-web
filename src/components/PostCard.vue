<template>
  <div v-on:click="$emit('pressed')">
    <el-card v-bind:key="post.id" shadow="hover" class="box-card">
      <div class="card-content">
        <h3>{{ post.title }}</h3>
        <div class="post-info">
          <h4>{{ post.author.nickname }}</h4>
          <h6>{{ updatedTime }}</h6>
          <h6>{{ updatedDate }}</h6>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import moment from 'moment';
import { Post } from '@/prototypes/post';

@Component
export default class PostCard extends Vue {
  @Prop({ required: true }) post!: Post;

  private updatedDate = '';

  private updatedTime = '';

  private created() {
    const updatedAt = moment.unix(this.post.updatedAt);
    this.updatedDate = updatedAt.format('dddd, MMMM Do YYYY');
    this.updatedTime = updatedAt.format('h:mm:ss a');
  }
}
</script>

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
