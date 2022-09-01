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
          <span class="header__icons-cart-number">{{ cart.length }}</span>
        </div>
        <i class="header__icons-user bx bx-user"></i>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    cart: Array,
  },
};
</script>
