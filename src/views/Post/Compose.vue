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
          <div class="title-wrapper">
            <el-input
              v-model="draftTitle"
              placeholder="Post title"
            ></el-input>
          </div>

          <Tinymce
            :value="draftPost.content"
            @input="onPostContentChanged"
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
  padding: 0 15px;
  border-right: 1px solid #dcdfe6;
  .title-wrapper {
    height: 64px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
  }
}
.side-bar {
  padding: 15px;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PostModule from '@/store/modules/post';
import Tinymce from '@/components/Tinymce/index.vue';

@Component({
  name: 'post-compose',
  components: {
    Tinymce,
  },
})
export default class extends Vue {
  private isLoading = false;

  private get draftPost() {
    return PostModule.draftPost;
  }

  get draftTitle() {
    return PostModule.draftPost.title;
  }

  set draftTitle(value: string) {
    PostModule.updateDraftPostContent(value);
  }

  private created() {
    PostModule.initDraftPost();
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
