<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png" />
    <LoginPad :handleLogin="handleLogin" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Login } from '@/prototypes/auth';
import { AuthModule } from '@/store/modules/auth';
import LoginPad from '@/components/LoginPad.vue';

@Component({
  name: 'login',
  components: {
    LoginPad,
  },
})
export default class extends Vue {
  private async handleLogin(
    email: string,
    password: string,
    rememberMe: boolean,
  ) {
    const login: Login = { email, password };
    await AuthModule.SignIn(login);
    if (AuthModule.isLoggedIn) {
      if (rememberMe) {
        localStorage.setItem('email', email);
      }
      this.$router.replace('/');
    }
  }
}
</script>

<style lang="scss">
</style>
