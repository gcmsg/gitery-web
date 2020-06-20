<template>
  <div>
    <el-row>
      <div class="breadcrumb">
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
            <h3>Author: {{post.author.nickname || 'Anonymous'}}</h3>
            <p>Created At: {{post.createdAt}}</p>
            <p>Updated At: {{post.updatedAt}}</p>
          </div>
          <el-divider></el-divider>
          <el-button
            v-if="allowEditing"
            type="primary"
            size="medium"
            @click="onEditButtonPressed"
          >
            {{editable ? 'Save': 'Edit'}}
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.breadcrumb {
  padding: 8px 15px;
}
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

@Component({
  name: 'post-view',
  components: {
    PostEditor,
  },
})
export default class extends Vue {
  private editable = false;

  private get post() {
    return PostModule.currentPost;
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
}
</script>
