<template>
  <div>
    <editor-content :editor="editor" />
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { Editor, EditorContent } from 'tiptap';

@Component({
  name: 'about',
  components: {
    EditorContent,
    Editor,
  },
})
export default class extends Vue {
  editor = new Editor({
    content: '<p>Initial editor content</p>',
  });

  beforeDestroy() {
    this.editor.destroy();
  }
}
</script>
