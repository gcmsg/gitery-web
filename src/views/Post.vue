<template>
  <div>
    <PostEditor :content="content" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PostEditor from '@/components/PostEditor.vue';

@Component({
  name: 'editor',
  components: {
    PostEditor,
  },
})
export default class extends Vue {
  private content = `
    <h2>
      Read-Only
    </h2>
    <p>
      This text is <strong>read-only</strong>. You are not able to edit something. <a href="https://scrumpy.io/">Links to fancy websites</a> are still working.
    </p>
  `;
}
</script>
