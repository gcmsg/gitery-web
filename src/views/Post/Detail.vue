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
          <PostEditor
            :editable="editable"
            :loading="isContentLoading"
            :title="post.title"
            :content="post.content"
            :onTitleChanged="onPostTitleChanged"
            :onContentChanged="onPostContentChanged"
          />
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
          <div v-if="allowEditing">
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
              title="这是一段内容确定删除吗？"
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
  padding-right: 15px;
  border-right: 1px solid #dcdfe6;
}
.side-bar {
  padding: 15px;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PostModule from '@/store/modules/post';
import UserModule from '@/store/modules/user';
import PostEditor from '@/components/Post/PostEditor.vue';
import { formatUnixTimestamp } from '@/utils/format';

@Component({
  name: 'post-view',
  components: {
    PostEditor,
  },
})
export default class extends Vue {
  private isActionLoading = false;

  private editable = false;

  private get post() {
    return PostModule.currentPost;
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

  private get allowEditing() {
    return UserModule.isLoggedIn && PostModule.currentPost.userID === UserModule.user.id;
  }

  private async created() {
    const postID = Number.parseInt(this.$route.params.id, 10);
    if (!Number.isNaN(postID)) {
      await PostModule.fetchPostDetail(postID);
    }
  }

  private onEditButtonPressed() {
    if (this.editable) {
      PostModule.syncPostUpdate();
    }
    this.editable = !this.editable;
  }

  private onPostTitleChanged(title: string) {
    PostModule.updateDraftPostTitle(title);
  }

  private onPostContentChanged(content: string) {
    PostModule.updateDraftPostContent(content);
  }

  private async onDeleteButtonPressed() {
    this.isActionLoading = true;
    await PostModule.syncPostDelete();
    this.$router.replace('/');
  }
}
</script>
