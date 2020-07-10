<template>
  <div class="wrapper">
    <el-card
      shadow="hover"
      :key="comment.id"
    >
      <div class="header">
        <div><b>{{comment.author.nickname}}</b> <span v-if="replyTo">replied to <b>{{replyTo}}</b></span>:</div>
        <div v-if="isAuthor">
          <el-button
            v-if="editable"
            type="primary"
            size="mini"
            @click="onDoneButtonPressed"
          >Done</el-button>
          <el-button
            v-else
            type="primary"
            size="mini"
            plain
            @click="onEditButtonPressed"
          >Edit</el-button>
        </div>
      </div>

      <div class="content">
        <el-input
          v-if="editable"
          type="textarea"
          autosize
          placeholder="请输入内容"
          v-model="content"
        >
        </el-input>
        <div v-else>
          {{content}}
        </div>
      </div>

      <CommentItem
        v-for="childComment in comment.comments"
        :key="childComment.id"
        :comment="childComment"
        :replyTo="comment.author.nickname"
        :userID="userID"
        @update="onUpdate"
      />
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  margin: 15px 0;
  .header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
  }
  .content {
    padding-top: 15px;
  }
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

  @Prop() userID!: number;

  @Prop() replyTo!: string;

  private editable = false;

  private content = '';

  private get isAuthor() {
    return this.userID === this.comment.author?.id;
  }

  private created() {
    this.content = this.comment.content;
  }

  private onEditButtonPressed() {
    this.editable = true;
  }

  private onDoneButtonPressed() {
    this.content = this.content.trim();
    this.$emit('update', this.comment, this.content);
    this.editable = false;
  }

  private onUpdate(comment: Comment, content: string) {
    this.$emit('update', comment, content);
  }
}
</script>