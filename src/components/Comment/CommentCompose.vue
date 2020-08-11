<template>
  <el-card shadow="hover">
    <div class="input-wrapper">
      <el-input
        placeholder="请输入内容"
        v-model="draft"
      ></el-input>
      <div class="actions">
        <el-button
          size="mini"
          type="primary"
          plain
          round
          icon="el-icon-close"
          @click="onCancel"
        ></el-button>
        <el-button
          type="primary"
          size="mini"
          round
          icon="el-icon-check"
          @click="onCreate"
        ></el-button>
      </div>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.input-wrapper {
  display: flex;
  flex-flow: column nowrap;
  .actions {
    padding-top: 15px;
    align-self: flex-end;
  }
}
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'CommentItem',
})
export default class CommentCompose extends Vue {
  private draft = '';

  private onCancel() {
    this.$emit('cancel');
  }

  private onCreate() {
    this.draft = this.draft.trim();
    if (this.draft !== '') {
      this.$emit('create', this.draft);
    }
  }
}
</script>