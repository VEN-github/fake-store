<template>
  <NavBar :cart="cart" @toggle-cart="toggleCart" />
  <ProductList
    :products="products"
    :categories="categories"
    @add-to-cart="addCart"
  />
  <CartList
    v-if="showCart"
    :cart="cart"
    :total="total"
    @toggle-cart="toggleCart"
    @delete-item="removeItem"
    @decrement-qty="decrementQty"
    @increment-qty="incrementQty"
  />
</template>

<script>
import NavBar from './components/NavBar.vue';
import ProductList from './components/ProductList.vue';
import CartList from './components/CartList.vue';
import axios from 'axios';
import { createToast } from 'mosha-vue-toastify';
export default {
  name: 'App',
  components: {
    NavBar,
    ProductList,
    CartList,
  },
  data() {
    return {
      products: [],
      cart: [],
      showCart: false,
    };
  },
  methods: {
    addCart(id) {
      const selectedItem = this.products.find(item => item.id === id);
      const existingItem = this.cart.findIndex(
        item => item.id === selectedItem.id
      );
      let message = '';
      if (existingItem < 0) {
        this.cart.push({ ...selectedItem, quantity: 1 });
        message = `${selectedItem.title} added to cart.`;
        this.alertMessage(message);
        return;
      }
      this.cart[existingItem].quantity += 1;
      message = `${selectedItem.title} updated the quantity.`;
      this.alertMessage(message);
    },
    toggleCart() {
      this.showCart = !this.showCart;
    },
    removeItem(id) {
      const index = this.cart.findIndex(item => item.id === id);
      this.cart.splice(index, 1);
    },
    incrementQty(id) {
      this.cart.filter(item => {
        if (item.id === id) {
          item.quantity += 1;
        }
      });
    },
    decrementQty(id) {
      this.cart.filter(item => {
        if (item.id === id) {
          item.quantity -= 1;
        }
      });
    },
    alertMessage(message) {
      createToast(message, {
        hideProgressBar: true,
        showIcon: true,
        swipeClose: false,
        timeout: 1000,
        position: 'top-center',
        type: 'success',
        transition: 'slide',
      });
    },
  },
  computed: {
    total() {
      return this.cart.reduce(
        (previous, current) => previous + current.price * current.quantity,
        0
      );
    },
    categories() {
      const categories = this.products.map(item => item.category);
      categories.unshift('All');
      return [...new Set(categories)];
    },
  },
  created() {
    axios
      .get('https://fakestoreapi.com/products')
      .then(res => (this.products = res.data))
      .catch(err => {
        return Promise.reject(err);
      });
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  line-height: 1.5;
}

.container {
  overflow: hidden;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;
}
</style>
