<template>
  <div class="cart__item">
    <img class="cart__item-image" :src="item.image" :alt="item.title" />
    <div>
      <button class="btn cart__item-del" @click="$emit('delete-item', item.id)">
        <i class="cart__item-del-icon bx bxs-trash-alt"></i>
      </button>
      <p class="cart__item-title">{{ item.title }}</p>
      <p class="cart__item-price">{{ formattedPrice }}</p>
      <div class="cart__item-quantity">
        <span class="cart__item-quantity-title">Quantity:</span>
        <button
          class="btn cart__item-quantity-btn"
          :class="{
            'cart__item-quantity-btn--disabled': item.quantity === 1,
          }"
          :disabled="item.quantity === 1"
          @click="$emit('decrement-qty', item.id)"
        >
          -
        </button>
        <input
          type="text"
          class="cart__item-quantity-input"
          :value="item.quantity"
        />
        <button
          class="btn cart__item-quantity-btn"
          @click="$emit('increment-qty', item.id)"
        >
          +
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartItem',
  props: {
    item: Object,
  },
  computed: {
    formattedPrice() {
      return `$${this.item.price.toFixed(2)}`;
    },
  },
  emits: ['delete-item', 'decrement-qty', 'increment-qty'],
};
</script>
