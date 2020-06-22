<template>
  <div>
    <el-row>
      <div class="breadcrumb-wrapper">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
          <el-breadcrumb-item>Compose post</el-breadcrumb-item>
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
            :editable="true"
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
          <el-button
            type="primary"
            size="medium"
            @click="onPublishButtonPressed"
            :loading="isLoading"
          >
            Publish
          </el-button>
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
import PostEditor from '@/components/Post/PostEditor.vue';

@Component({
  name: 'post-compose',
  components: {
    PostEditor,
  },
})
export default class extends Vue {
  private isLoading = false;

  private get post() {
    return PostModule.draftPost;
  }

  private created() {
    PostModule.initDraftPost();
  }

  private onPostTitleChanged(title: string) {
    PostModule.updateDraftPostTitle(title);
  }

  private onPostContentChanged(content: string) {
    PostModule.updateDraftPostContent(content);
  }

  private async onPublishButtonPressed() {
    this.isLoading = true;
    await PostModule.syncPostCreate();
    this.$router.replace(`/post/${PostModule.currentPost.id}`);
  }
}
</script>
