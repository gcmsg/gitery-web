<template>
  <div>
    <img
      alt="Vue logo"
      src="../assets/logo.png"
    />
    <LoginPad
      :handleLogin="handleLogin"
      :defaultEmail="defaultEmail"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Login } from '@/prototypes/auth';
import UserModule from '@/store/modules/user';
import LoginPad from '@/components/Auth/LoginPad.vue';

@Component({
  name: 'login',
  components: {
    LoginPad,
  },
})
export default class extends Vue {
  private defaultEmail = '';

  private created() {
    const defaultEmail = localStorage.getItem('email');
    if (defaultEmail != null) {
      this.defaultEmail = defaultEmail;
    }
  }

  private async handleLogin(
    email: string,
    password: string,
    rememberMe: boolean,
  ) {
    const login: Login = { email, password };
    await UserModule.SignIn(login);
    if (UserModule.isLoggedIn) {
      if (rememberMe) {
        localStorage.setItem('email', email);
      } else {
        localStorage.removeItem('email');
      }
      this.$router.replace('/');
    }
  }
}
</script>
