<template>
  <header>
    <div class="container flex">
      <div class="logo">
        <a href="#">Fake Store</a>
      </div>
      <div class="nav-icons">
        <div @click="$emit('toggle-cart')" class="cart">
          <i class="bx bx-cart"></i>
          <span>{{ cart.length }}</span>
        </div>
        <i class="bx bx-user"></i>
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

<style scoped>
header {
  position: sticky;
  top: 0;
  width: 100%;
  padding: 1.3rem 0;
  background-color: #f4f1de;
}

.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.logo a {
  font-size: 2rem;
  text-decoration: none;
  color: #3d405b;
  transition: color 0.5s ease;
}

.logo a:hover {
  color: #e07a5f;
}

.nav-icons {
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
}

.nav-icons i {
  font-size: 1.95rem;
  color: #3d405b;
  cursor: pointer;
  transition: color 0.5s ease;
}

.nav-icons i:hover {
  color: #e07a5f;
}

.nav-icons i:last-child {
  margin-left: 1.5rem;
}

.cart {
  position: relative;
}

.cart span {
  position: absolute;
  top: -4px;
  right: -6px;
  width: 20px;
  height: 20px;
  font-size: 0.875rem;
  text-align: center;
  background-color: #e07a5f;
  color: #fff;
  border-radius: 50%;
}
</style>
