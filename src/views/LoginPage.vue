<template>
  <div class="container">
    <div class="login">
      <h4 class="login__title">Login to Fake Store</h4>
      <div class="login__card">
        <form @submit.prevent="login()">
          <div class="input-group">
            <label class="label" for="username">Username</label
            ><input class="input login__input" type="text" id="username" v-model="username" />
          </div>
          <div class="input-group">
            <label class="label" for="password">Password</label
            ><input class="input login__input" type="password" id="password" v-model="password" />
          </div>
          <input class="btn btn_primary login__submit" type="submit" value="Login" />
        </form>
      </div>
      <p class="login__new">
        Don't have an account yet?
        <router-link class="login__link" to="/">Sign up here</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      username: null,
      password: null,
    };
  },
  methods: {
    login() {
      const { username, password } = this;

      if (!username || !password) {
        alert('Please input empty fields.');
        return;
      }
      this.$store.dispatch('login', {
        username,
        password,
      });
      this.username = null;
      this.password = null;
    },
  },
};
</script>
