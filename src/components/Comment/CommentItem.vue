<template>
  <div class="wrapper">
    <el-card
      shadow="hover"
      :key="comment.id"
    >
      <div><b>{{comment.author.nickname}}</b> <span v-if="replyTo">replied to <b>{{replyTo}}</b></span>:</div>
      <br />
      <div>{{comment.content}}</div>
      <CommentItem
        v-for="childComment in comment.comments"
        :key="childComment.id"
        :comment="childComment"
        :replyTo="comment.author.nickname"
      />
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  margin: 15px 0;
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Comment } from '@/prototypes/comment';

@Component({
  name: 'CommentItem',
})
export default class CommentItem extends Vue {
  @Prop({ required: true }) comment!: Comment;

  @Prop() replyTo!: string;

  @Prop({ default: false }) editable!: boolean;
}
</script>