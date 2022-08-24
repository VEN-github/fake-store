<template>
  <div class="container">
    <ul class="categories">
      <li
        :class="{ active: this.selectedCategory === category }"
        v-for="(category, index) in categories"
        :key="index"
      >
        <span @click="this.selectedCategory = category">{{ category }}</span>
      </li>
    </ul>
    <div class="product-container">
      <div
        class="product"
        v-for="product in filteredProducts"
        :key="product.id"
      >
        <img lazy :src="product.image" alt="" />
        <p>{{ product.title }}</p>
        <p>${{ product.price.toFixed(2) }}</p>
        <button @click="addCart(product.id)">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductList',
  props: {
    products: Array,
    categories: Array,
  },
  data() {
    return {
      selectedCategory: 'All',
    };
  },
  methods: {
    addCart(id) {
      this.$emit('add-to-cart', id);
    },
  },
  computed: {
    filteredProducts() {
      return this.selectedCategory === 'All'
        ? this.products
        : this.products.filter(item => item.category === this.selectedCategory);
    },
  },
};
</script>

<style scoped>
.categories {
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style: none;
  margin-top: 5rem;
  margin-bottom: 1rem;
}

.categories li {
  font-size: 1.125rem;
  text-transform: capitalize;
  cursor: pointer;
}

.categories li:hover {
  color: #e07a5f;
}

.categories li.active {
  color: #ee6c4d;
}

.product-container {
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  grid-auto-flow: dense;
  gap: 30px;
  /* margin-top: 8rem; */
  margin-bottom: 2rem;
  padding: 2rem;
  background-color: #eff1f3;
  border-radius: 15px;
}

.product {
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
    100px 100px 80px rgba(0, 0, 0, 0.07);
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
  transition: background-color 0.5 ease;
}

button:hover {
  background-color: #ee6c4d;
}
</style>
