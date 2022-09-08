<template>
  <NavBar @toggle-cart="toggleCart" />
  <CartList
    v-if="showCart"
    :cart="cart"
    :total="total"
    @toggle-cart="toggleCart"
    @delete-item="removeItem"
    @decrement-qty="decrementQty"
    @increment-qty="incrementQty"
  />
  <router-view v-if="categories" :categories="categories" @add-to-cart="addCart" />
</template>

<script>
import NavBar from './components/NavBar.vue';
import CartList from './components/CartList.vue';
export default {
  name: 'App',
  components: {
    NavBar,
    CartList,
  },
  methods: {
    addCart(id) {
      this.$store.dispatch('addToCart', id);
    },
    toggleCart() {
      this.$store.dispatch('toggleCart');
    },
    removeItem(id) {
      this.$store.dispatch('removeItem', id);
    },
    incrementQty(id) {
      this.$store.dispatch('increment', id);
    },
    decrementQty(id) {
      this.$store.dispatch('decrement', id);
    },
  },
  computed: {
    products() {
      return this.$store.getters.getAllProducts;
    },
    categories() {
      return this.$store.getters.getAllCategories;
    },
    cart() {
      return this.$store.getters.getAllCartItems;
    },
    showCart() {
      return this.$store.getters.showCart;
    },
    total() {
      return this.$store.getters.cartTotal;
    },
  },
  created() {
    this.$store.dispatch('init');
  },
};
</script>
