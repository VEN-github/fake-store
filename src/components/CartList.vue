<template>
  <div class="cart__overlay" @click="$emit('toggle-cart')"></div>
  <div class="cart">
    <div class="cart__header">
      <span class="cart__header__title">Your Cart</span>
      <button class="btn" @click="$emit('toggle-cart')">
        <i class="cart__header__close bx bx-x"></i>
      </button>
    </div>
    <div class="cart__empty" v-if="!cart.length">
      <img
        class="cart__empty__image"
        src="../assets/empty-cart.svg"
        alt="Illustration of Empty Cart"
      />
      <p class="cart__empty__title">Your cart is currently empty</p>
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
      <p class="cart__item__total">Total: {{ formattedPrice }}</p>
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
