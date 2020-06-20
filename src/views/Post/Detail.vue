<template>
  <el-row>
    <el-col
      :xs="24"
      :sm="18"
    >
      <div class="post-section">
        <PostEditor
          :editable="editable"
          :title="title"
          :content="content"
          :onTitleChanged="onPostTitleChanged"
          :onContentChanged="onPostContentChanged"
        />
      </div>

    </el-col>
    <el-col
      :xs="24"
      :sm="5"
      v-if="allowEditing"
    >
      <div class="side-bar">
        <div class="checkbox">
          <input
            type="checkbox"
            id="editable"
            v-model="editable"
          />
          <label for="editable"> editable</label>
        </div>
        <el-button
          class="save-button"
          type="primary"
          size="medium"
          @click="onPostSave"
        >
          Save
        </el-button>
      </div>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.post-section {
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

  private get title() {
    return PostModule.currentPost.title;
  }

  private get content() {
    return PostModule.currentPost.content;
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

  private onPostTitleChanged(title: string) {
    PostModule.updateDraftPostTitle(title);
  }

  private onPostContentChanged(content: string) {
    PostModule.updateDraftPostContent(content);
  }

  private async onPostSave() {
    this.editable = false;
    await PostModule.syncPostUpdate();
  }
}
</script>
