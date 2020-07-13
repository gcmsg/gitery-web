<template>
  <div class="container">
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
            round
            icon="el-icon-check"
            @click="onEditDone"
          ></el-button>
          <el-button
            v-else
            type="primary"
            size="mini"
            plain
            round
            icon="el-icon-edit"
            @click="onEditButtonPressed"
          ></el-button>
        </div>
      </div>

      <div class="content">
        <el-input
          v-if="editable"
          type="textarea"
          autosize
          placeholder="请输入内容"
          v-model="content"
        ></el-input>
        <div v-else>
          {{content}}
        </div>
      </div>

      <div class="actions">
        <el-button
          size="mini"
          type="primary"
          plain
          round
          icon="el-icon-plus"
          @click="onAddCommentPressed"
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

      <div v-if="depth < 1 || showMore">
        <div class="draft" v-if="isDrafting">
          <el-card shadow="hover">
            <div class="compose">
              <el-input
                type="textarea"
                autosize
                placeholder="请输入内容"
                v-model="draft"
              ></el-input>
              <div class="actions">
                <el-button
                  size="mini"
                  type="primary"
                  plain
                  round
                  icon="el-icon-close"
                  @click="onCommentCancel"
                ></el-button>
                <el-button
                  type="primary"
                  size="mini"
                  round
                  icon="el-icon-check"
                  @click="onCommentDone"
                ></el-button>
              </div>
            </div>
          </el-card>
        </div>

        <CommentItem
          v-for="childComment in comment.comments"
          :key="childComment.id"
          :comment="childComment"
          :replyTo="comment.author.nickname"
          :userID="userID"
          :depth="depth+1"
          @update="onUpdate"
        />
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin: 15px 0;
  .header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
  }
  .content {
    padding: 15px 0;
  }
  .actions {
    display: flex;
    flex-flow: row nowrap;
  }
  .draft {
    padding: 15px 0 0;
    .compose {
      display: flex;
      flex-flow: column nowrap;
      .actions {
        padding-top: 15px;
        align-self: flex-end;
      }
    }
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

  @Prop({ default: 0 }) depth!: number;

  private editable = false;

  private content = '';

  private showMore = false;

  private isDrafting = false;

  private draft = '';

  private get isAuthor() {
    return this.userID === this.comment.author?.id;
  }

  private created() {
    this.content = this.comment.content;
  }

  private onEditButtonPressed() {
    this.editable = true;
  }

  private onEditDone() {
    this.content = this.content.trim();
    this.$emit('update', this.comment, this.content);
    this.editable = false;
  }

  private onUpdate(comment: Comment, content: string) {
    this.$emit('update', comment, content);
  }

  private onShowMorePressed() {
    this.showMore = !this.showMore;
  }

  private onAddCommentPressed() {
    if (this.depth > 0) {
      this.showMore = true;
    }
    this.isDrafting = true;
  }

  private onCommentDone() {
    this.isDrafting = false;
  }

  private onCommentCancel() {
    this.isDrafting = false;
  }
}
</script>