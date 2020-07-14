<template>
  <div class="container">
    <el-card
      shadow="hover"
      :key="comment.id"
    >
      <!-- Header section -->
      <div class="header-wrapper">
        <div><b>{{comment.author.nickname}}</b> <span v-if="replyTo">replied to <b>{{replyTo}}</b></span>:</div>
        <div v-if="isAuthor">
          <el-button
            v-if="editable && !comment.isDeleted"
            size="mini"
            type="danger"
            plain
            round
            icon="el-icon-delete"
            @click="onDeletePressed"
          ></el-button>
          <el-button
            v-if="editable"
            size="mini"
            type="primary"
            plain
            round
            icon="el-icon-close"
            @click="onEditActionPressed"
          ></el-button>
          <el-button
            v-if="editable"
            type="primary"
            size="mini"
            round
            icon="el-icon-check"
            @click="onEditDonePressed"
          ></el-button>
          <el-button
            v-else
            type="primary"
            size="mini"
            plain
            round
            icon="el-icon-edit"
            @click="onEditPressed"
          ></el-button>
        </div>
      </div>

      <!-- Content section -->
      <div class="content-wrapper">
        <el-input
          v-if="editable"
          placeholder="请输入内容"
          v-model="content"
        ></el-input>
        <el-alert
          v-else-if="comment.isDeleted"
          title="This comment has been deleted"
          type="info"
          :closable="false"
        >
        </el-alert>
        <div v-else>
          {{content}}
        </div>
      </div>

      <!-- Actions section -->
      <div class="actions-wrapper">
        <el-button
          size="mini"
          type="primary"
          plain
          round
          :icon="isDrafting ? 'el-icon-close' : 'el-icon-plus'"
          @click="onCommentActionPressed"
        ></el-button>
        <el-button
          size="mini"
          type="primary"
          plain
          round
          icon="el-icon-star-off"
        ></el-button>
        <el-button
          v-if="depth > 0 && comment.comments"
          size="mini"
          type="primary"
          :plain="!showMore"
          round
          :icon="showMore ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"
          @click="onShowMorePressed"
        ></el-button>
      </div>

      <!-- Add new comment -->
      <div v-if="depth < 1 || showMore">
        <div
          class="draft-wrapper"
          v-if="isDrafting"
        >
          <CommentCompose
            @create="onCreateDone"
            @cancel="onCommentActionPressed"
          ></CommentCompose>
        </div>

        <CommentItem
          v-for="childComment in comment.comments"
          :key="childComment.id"
          :comment="childComment"
          :replyTo="comment.author.nickname"
          :userID="userID"
          :depth="depth+1"
          @create="onCommentCreate"
          @update="onCommentUpdate"
          @delete="onCommentDelete"
        />
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin: 15px 0;
  .header-wrapper {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
  }
  .content-wrapper {
    padding: 15px 0;
  }
  .actions-wrapper {
    display: flex;
    flex-flow: row nowrap;
  }
  .draft-wrapper {
    padding: 15px 0 0;
  }
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Comment } from '@/prototypes/comment';
import CommentCompose from './CommentCompose.vue';

@Component({
  name: 'CommentItem',
  components: {
    CommentCompose,
  },
})
export default class CommentItem extends Vue {
  @Prop({ required: true }) comment!: Comment;

  @Prop() userID!: number;

  @Prop() replyTo!: string;

  @Prop({ default: 0 }) depth!: number;

  private editable = false;

  private content = '';

  private showMore = false;

  private isDrafting = false;

  private get isAuthor() {
    return this.userID === this.comment.author?.id;
  }

  private created() {
    this.content = this.comment.content;
  }

  private onShowMorePressed() {
    this.showMore = !this.showMore;
  }

  // update comment
  private onEditActionPressed() {
    this.content = this.comment.content;
    this.editable = !this.editable;
  }

  private onEditDonePressed() {
    this.content = this.content.trim();
    if (this.content !== this.comment.content || this.comment.isDeleted) {
      this.onCommentUpdate(this.comment, this.content);
    }
    this.editable = false;
  }

  private onCommentUpdate(comment: Comment, content: string) {
    this.$emit('update', comment, content);
  }

  // create comment
  private onCommentActionPressed() {
    if (this.depth > 0) {
      this.showMore = true;
    }
    this.isDrafting = !this.isDrafting;
  }

  private onCreateDone(draft: string) {
    this.onCommentCreate(draft, this.comment);
    this.isDrafting = false;
  }

  private onCommentCreate(content: string, parent: Comment) {
    this.$emit('create', content, parent);
  }

  // delete comment
  private onDeletePressed() {
    this.editable = false;
    this.content = this.comment.content;
    this.onCommentDelete(this.comment);
  }

  private onCommentDelete(comment: Comment) {
    this.$emit('delete', comment);
  }
}
</script>