<template>
  <div>
    <PostEditor
      v-if="!isLoading"
      :content="content"
      :onTitleChanged="onPostTitleChanged"
      :onContentChanged="onPostContentChanged"
      @onSave="onPostSave"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PostModule from '@/store/modules/post';
import PostEditor from '@/components/PostEditor.vue';

@Component({
  name: 'post-view',
  components: {
    PostEditor,
  },
})
export default class extends Vue {
  private isLoading = true;

  private get content() {
    return PostModule.currentPost.content;
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
    await PostModule.syncPostUpdate();
  }
}
</script>
