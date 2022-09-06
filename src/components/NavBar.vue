<template>
  <header class="header">
    <div class="container header_flex">
      <div class="header__logo">
        <router-link class="header__link" to="/products"
          >Fake Store</router-link
        >
      </div>
      <div class="header__icons">
        <div class="header__icons-cart" @click="$emit('toggle-cart')">
          <i class="header__icons-cart-icon bx bx-cart"></i>
          <span class="header__icons-cart-number">{{ cartCount }}</span>
        </div>
        <div class="header__icons-user">
          <i class="header__icons-user-icon bx bx-user"></i>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'NavBar',
  computed: {
    cartCount() {
      return this.$store.getters.cartCount;
    },
  },
};
</script>
