<template>
  <router-link class="product__link" :to="productLink">
    <div class="product__card" :class="[`product__card--${size}`]">
      <img
        lazy
        class="product__card__image"
        :src="product.image"
        :alt="product.title"
      />
      <p class="product__card__title">{{ product.title }}</p>
      <p class="product__card__price">{{ formattedPrice }}</p>
      <button
        class="btn btn--primary product__card__btn"
        v-if="showButton"
        @click.prevent="$emit('add-to-cart', product.id)"
      >
        Add to Cart
      </button>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'ProductItem',
  props: {
    product: Object,
    showButton: { type: Boolean, default: false },
    size: {
      type: String,
      default: 'md',
      validator: v => ['sm', 'md'].includes(v),
    },
  },
  computed: {
    formattedPrice() {
      return `$${this.product.price.toFixed(2)}`;
    },
    productLink() {
      return `/product/${this.product.id}`;
    },
  },
};
</script>
