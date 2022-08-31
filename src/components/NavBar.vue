<template>
  <header class="header">
    <div class="container header--flex">
      <div class="header__logo">
        <router-link class="header__link" to="/products"
          >Fake Store</router-link
        >
      </div>
      <div class="header__icons__container">
        <div
          class="header__icons__cart__container"
          @click="$emit('toggle-cart')"
        >
          <i class="header__icons header__icons__cart bx bx-cart"></i>
          <span class="header__icons__cart__number">{{ cart.length }}</span>
        </div>
        <i class="header__icons header__icons__user bx bx-user"></i>
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
