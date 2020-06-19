<template>
  <el-row>
    <el-col :xs="24" :sm="18">
      <PostEditor
        v-if="!isLoading"
        :content="content"
        :editable="editable"
        :onTitleChanged="onPostTitleChanged"
        :onContentChanged="onPostContentChanged"
      />
    </el-col>
    <el-col :xs="24" :sm="6" v-if="allowEditing">
      <div class="checkbox">
        <input type="checkbox" id="editable" v-model="editable" />
        <label for="editable"> editable</label>
      </div>
      <el-button class="save-button" type="primary" @click="onPostSave">
        Save
      </el-button>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PostModule from '@/store/modules/post';
import UserModule from '@/store/modules/user';
import PostEditor from '@/components/PostEditor.vue';

@Component({
  name: 'post-view',
  components: {
    PostEditor,
  },
})
export default class extends Vue {
  private isLoading = true;

  private editable = false;

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
      this.isLoading = false;
    }
  }

  private onPostTitleChanged(title: string) {
    PostModule.updateDraftPostTitle(title);
  }

  private onPostContentChanged(content: string) {
    PostModule.updateDraftPostTitle(content);
  }

  private async onPostSave() {
    this.editable = false;
    await PostModule.syncPostUpdate();
  }
}
</script>
