<template>
  <header class="header">
    <div class="container header_flex">
      <div class="header__logo">
        <router-link class="header__link" to="/products">Fake Store</router-link>
      </div>
      <div class="header__icons">
        <div class="header__icons-cart" @click="$emit('toggle-cart')">
          <i class="header__icons-cart-icon bx bx-cart"></i>
          <span class="header__icons-cart-number">{{ cartCount }}</span>
        </div>
        <router-link class="btn btn_primary header__login" to="/login" v-if="!isLogged"
          >Login</router-link
        >
        <div class="header__dropdown" v-else>
          <div class="header__dropdown-avatar" @click="toggleDropdown">{{ user }}</div>
          <ul
            class="header__dropdown-menu"
            :class="{ 'header__dropdown-menu--open': showDropdown }"
          >
            <li class="header__dropdown-item">
              <i class="header__dropdown-item-icon bx bx-user"></i>Profile
            </li>
            <li class="header__dropdown-item" @click="logout">
              <i class="header__dropdown-item-icon bx bx-log-out"></i>Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      showDropdown: false,
    };
  },
  computed: {
    cartCount() {
      return this.$store.getters.cartCount;
    },
    isLogged() {
      return this.$store.getters.isLogged;
    },
    user() {
      return this.$store.getters.getSingleUser;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
  },
};
</script>
