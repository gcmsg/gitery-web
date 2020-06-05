<template>
  <div>
    <div class="checkbox">
      <input type="checkbox" id="editable" v-model="editable" />
      <label for="editable"> editable</label>
    </div>
    <editor-menu-bar
      v-if="editable"
      :editor="editor"
      v-slot="{ commands, isActive }"
    >
      <div>
        <button
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          Heading 1
        </button>
        <button
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          Heading 2
        </button>
        <button
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          Heading 3
        </button>
        <button
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          Bold
        </button>
        <button
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >
          Code
        </button>
        <button
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          Italic
        </button>
        <button
          :class="{ 'is-active': isActive.link() }"
          @click="commands.link"
        >
          Link
        </button>
      </div>
    </editor-menu-bar>
    <editor-content :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
import {
  HardBreak,
  Heading,
  Bold,
  Code,
  Italic,
  Link,
} from 'tiptap-extensions';

import {
  Component, Prop, Watch, Vue,
} from 'vue-property-decorator';

@Component({
  name: 'post-editor',
  components: {
    EditorContent,
    EditorMenuBar,
  },
})
export default class extends Vue {
  @Prop({ default: '' }) content;

  editable = false;

  editor;

  created() {
    this.editor = new Editor({
      editable: false,
      extensions: [
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new Link(),
        new Bold(),
        new Code(),
        new Italic(),
      ],
      content: this.content,
    });
  }

  beforeDestroy() {
    this.editor.destroy();
  }

  @Watch('editable')
  onEditableChanged() {
    this.editor.setOptions({
      editable: this.editable,
    });
  }
}
</script>

<style lang="scss">
.checkbox {
  margin-bottom: 1rem;
}
</style>
