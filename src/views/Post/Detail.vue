<template>
  <div>
    <el-row>
      <div class="breadcrumb-wrapper">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
          <el-breadcrumb-item>{{post.title}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-row>
    <el-row>
      <el-col
        :xs="24"
        :sm="18"
      >
        <div class="post-section">
          <div class="title-wrapper">
            <el-input
              v-if="editable"
              v-model="draftPost.title"
              placeholder="Post title"
            ></el-input>
            <h1
              v-else
              v-text="post.title"
            ></h1>
          </div>

          <div
            class="content-wrapper"
            v-loading="isContentLoading"
          >
            <TextEditor
              v-if="editable"
              :value="draftPost.content"
              @input="onPostContentChanged"
            />
            <div
              v-else
              v-html="post.content"
            />
          </div>

          <div class="comment-wrapper">
            <CommentItem
              v-for="(comment, index) in post.comments"
              :key="comment.id"
              :comment="comment"
              :userID="userID"
              :treePath="[index]"
              @update="onCommentUpdate"
            />
          </div>
        </div>
      </el-col>

      <el-col
        :xs="24"
        :sm="6"
      >
        <div class="side-bar">
          <div>
            <h4>Author: {{post.author ? post.author.nickname : 'Anonymous'}}</h4>
            <b>Created At:</b>
            <p v-text="createdTime"></p>
            <b>Updated At:</b>
            <p v-text="updatedTime"></p>
          </div>
          <el-divider></el-divider>
          <div v-if="isAuthor">
            <el-button
              type="primary"
              size="medium"
              @click="onEditButtonPressed"
              :loading="isActionLoading"
              style="margin-right: 10px"
            >
              {{editable ? 'Save': 'Edit'}}
            </el-button>
            <el-popconfirm
              placement="top"
              title="Confirm to delete?"
              @onConfirm="onDeleteButtonPressed"
            >
              <el-button
                slot="reference"
                type="danger"
                size="medium"
                :loading="isActionLoading"
              >
                Delete
              </el-button>
            </el-popconfirm>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.post-section {
  padding: 0 15px;
  border-right: 1px solid #dcdfe6;
  min-height: 60vh;
  .title-wrapper {
    padding: 8px 0;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
  }
  .content-wrapper {
    padding: 8px 0;
  }
  .comment-wrapper {
    padding: 15px 0;
  }
}
.side-bar {
  padding: 15px;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Post } from '@/prototypes/post';
import { Comment } from '@/prototypes/comment';
import PostModule from '@/store/modules/post';
import UserModule from '@/store/modules/user';
import TextEditor from '@/components/TextEditor/Editor.vue';
import CommentItem from '@/components/Comment/CommentItem.vue';
import { formatUnixTimestamp } from '@/utils/format';

@Component({
  name: 'post-view',
  components: {
    TextEditor,
    CommentItem,
  },
})
export default class extends Vue {
  private isActionLoading = false;

  private editable = false;

  private draftPost = {
    title: '',
    content: '',
  } as Post;

  private get post() {
    return PostModule.currentPost;
  }

  private onPostContentChanged(content: string) {
    this.draftPost.content = content;
  }

  private get isContentLoading() {
    return !PostModule.currentPost.content;
  }

  private get createdTime() {
    if (this.post.createdAt !== undefined) {
      return formatUnixTimestamp(this.post.createdAt);
    }
    return '';
  }

  private get updatedTime() {
    if (this.post.createdAt !== undefined) {
      return formatUnixTimestamp(this.post.updatedAt);
    }
    return '';
  }

  private get userID() {
    return UserModule.user.id;
  }

  private get isAuthor() {
    return UserModule.isLoggedIn && PostModule.currentPost.userID === UserModule.user.id;
  }

  private async created() {
    const postID = Number.parseInt(this.$route.params.id, 10);
    if (!Number.isNaN(postID)) {
      await PostModule.fetchPostDetail(postID);
      this.draftPost.id = postID;
      this.draftPost.title = this.post.title;
      this.draftPost.content = this.post.content;
    }
  }

  private async onEditButtonPressed() {
    if (this.editable) {
      this.isActionLoading = true;
      await PostModule.syncPostUpdate(this.draftPost);
      this.isActionLoading = false;
    }
    this.editable = !this.editable;
  }

  private async onDeleteButtonPressed() {
    this.isActionLoading = true;
    await PostModule.syncPostDelete();
    this.$router.replace('/');
  }

  private async onCommentUpdate(comment: Comment, content: string) {
    await PostModule.updateComment({ comment, content });
  }
}
</script>
