<template>
  <div :class="{ content: true, editing: editable }">
    <el-input
      v-model="draftTitle"
      placeholder="Post title"
    ></el-input>

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
  @Prop({ default: false }) editable;

  @Prop({ default: '' }) title;

  @Prop({ default: '' }) content;

  @Prop({ required: false }) onTitleChanged;

  @Prop({ required: false }) onContentChanged;

  get draftTitle() {
    return this.title;
  }

  set draftTitle(value) {
    this.onTitleChanged(value);
  }

  editor;

  created() {
    this.draftTitle = this.title;
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
      onUpdate: ({ getHTML }) => {
        // get new content on update
        const newContent = getHTML();
        this.onContentChanged(newContent);
      },
    });
  }

  beforeDestroy() {
    this.editor.destroy();
  }

  @Watch('editable')
  onEditableChanged(value) {
    this.editor.setOptions({
      editable: value,
    });
  }

  @Watch('title')
  onTitlePropUpdate(value) {
    this.draftTitle = value;
  }

  @Watch('content')
  onContentPropUpdate(value) {
    if (!this.editable) {
      this.editor.setContent(value);
    }
  }
}
</script>

<style lang="scss">
.checkbox {
  margin-bottom: 1rem;
}
.content {
  padding: 0 15px;
  &.editing {
    padding: 15px 15px;
    border: 1px solid #cccccc;
    border-radius: 5px;
  }
}
.save-button {
  width: 8rem;
}
</style>
