<template>
  <div class="cart-overlay" @click="$emit('toggle-cart')"></div>
  <div class="cart-container">
    <div class="cart-header">
      <span>Your Cart</span>
      <button @click="$emit('toggle-cart')">
        <i class="bx bx-x"></i>
      </button>
    </div>
    <div class="empty-space" v-if="!cart.length">
      <img src="../assets/empty-cart.svg" alt="Illustration of Empty Cart" />
      <p>Your cart is currently empty</p>
    </div>
    <div v-else>
      <CartItem
        v-for="item in cart"
        :key="item.id"
        :item="item"
        @delete-item="$emit('delete-item', item.id)"
        @increment-qty="$emit('increment-qty', item.id)"
        @decrement-qty="$emit('decrement-qty', item.id)"
      />
      <p class="total">Total: {{ formattedPrice }}</p>
    </div>
  </div>
</template>

<script>
import CartItem from './CartItem.vue';
export default {
  name: 'CartList',
  props: {
    cart: Array,
    total: Number,
  },
  components: {
    CartItem,
  },
  computed: {
    formattedPrice() {
      return `$${this.total.toFixed(2)}`;
    },
  },
  emits: ['toggle-cart', 'delete-item', 'decrement-qty', 'increment-qty'],
};
</script>

<style scoped>
.cart-overlay {
  position: fixed;
  inset: 0;
  z-index: 2;
  width: 100%;
  height: 100vh;
  background-color: #2c3037;
  opacity: 0.7;
}
.cart-container {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 2;
  overflow-y: scroll;
  width: 500px;
  max-width: 100%;
  height: 100%;
  padding: 1.5rem 2rem;
  background-color: #eff1f3;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-header span {
  font-size: 2rem;
  font-weight: 500;
}

button {
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
}

button i {
  font-size: 2.5rem;
  font-weight: 500;
  color: #000;
}

.empty-space {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transform: translate(-50%, -50%);
}

.empty-space img {
  width: 350px;
  object-fit: cover;
  margin-bottom: 2rem;
}

.empty-space p {
  font-size: 1.5rem;
}

.total {
  font-size: 1.2rem;
  font-weight: 500;
}
</style>
