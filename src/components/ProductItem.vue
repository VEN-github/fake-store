<template>
  <router-link :to="productLink">
    <div class="product" :class="[`product-${size}`]">
      <img lazy :src="product.image" :alt="product.title" />
      <p>{{ product.title }}</p>
      <p>{{ formattedPrice }}</p>
      <button
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
    productId: Number,
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
      return `/product/${this.productId}`;
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  transition: transform 0.4s ease-in;
}

a:hover {
  transform: scale(1.1);
}

.product {
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  background-color: #fff;
  border-radius: 10px;
}

.product-md {
  width: 100%;
  box-shadow: 12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
    100px 100px 80px rgba(0, 0, 0, 0.07);
}

.product-sm {
  margin: 0 1rem;
}

.product img {
  flex-grow: 1;
  width: 300px;
  height: 300px;
  object-fit: contain;
  margin-bottom: 2rem;
  padding: 2rem;
}
.product p {
  padding: 0 1rem;
}

.product p:nth-child(2) {
  margin-bottom: 0.3rem;
  font-size: 1.125rem;
  font-weight: 500;
  color: #293241;
}

.product p:nth-child(3) {
  margin-bottom: 1rem;
  font-size: 1.125rem;
  font-weight: 400;
  color: #293241;
}

button {
  margin-bottom: 2rem;
  padding: 0.5em 0.75em;
  font-size: 1.125rem;
  font-weight: 500;
  background-color: #e07a5f;
  color: #fff;
  border: none;
  outline: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.5s ease;
}

button:hover {
  background-color: #ee6c4d;
}
</style>
