<template>
  <div>
    <el-input v-model="email" placeholder="请输入内容"></el-input>
    <el-input v-model="password" placeholder="请输入密码" show-password></el-input>
    <el-button @click="onLoginPressed" type="text">Login</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class LoginPad extends Vue {
  @Prop() handleLogin!: Function;

  private email = '';

  private password = '';

  private onLoginPressed() {
    this.handleLogin(this.email, this.password);
  }
}
</script>

<style lang="scss" scoped>
</style>
