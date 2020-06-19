<template>
  <div class="login-pad">
    <div class="input-container">
      <el-input
        v-model="email"
        placeholder="请输入内容"
      ></el-input>
    </div>
    <div class="input-container">
      <el-input
        v-model="password"
        placeholder="请输入密码"
        show-password
      ></el-input>
    </div>
    <el-checkbox v-model="rememberMe">Remember Me!</el-checkbox>
    <el-button
      class="login-button"
      type="primary"
      @click="onLoginPressed"
    >Login</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class LoginPad extends Vue {
  @Prop({ required: true }) handleLogin!: (
    email: string,
    password: string,
    rememberMe: boolean,
  ) => void;

  @Prop({ default: '' }) defaultEmail!: string;

  private email = this.defaultEmail;

  private password = '';

  private rememberMe = this.defaultEmail !== '';

  private onLoginPressed() {
    this.handleLogin(this.email, this.password, this.rememberMe);
  }
}
</script>

<style lang="scss" scoped>
.login-pad {
  height: 16rem;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;
  .input-container {
    width: 18rem;
  }
  .login-button {
    width: 18rem;
  }
}
</style>
