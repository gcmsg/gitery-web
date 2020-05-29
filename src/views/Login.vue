<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png" />
    <LoginPad :handleLogin="handleLogin" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Login } from '@/prototypes/auth';
import { User } from '@/prototypes/user';
import signIn from '@/api/auth';
import LoginPad from '@/components/LoginPad.vue';

@Component({
  name: 'login',
  components: {
    LoginPad,
  },
})
export default class extends Vue {
  private token?: string;

  private user?: User;

  private rememberMe = false;

  private async handleLogin(
    email: string,
    password: string,
    rememberMe: boolean,
  ) {
    console.log(email, password, rememberMe);
    const login: Login = { email, password };
    const { data } = await signIn(login);
    if (data.ok) {
      const { token, user } = data.data;
      this.token = token;
      this.user = user;
      this.rememberMe = rememberMe;
    } else {
      // alert error
    }
  }
}
</script>

<style lang="scss">
</style>
