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
      <ProductItem
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        showButton
        @add-to-cart="$emit('add-to-cart', product.id)"
      />
    </div>
  </div>
</template>

<script>
import ProductItem from '../components/ProductItem.vue';
export default {
  name: 'ProductList',
  props: {
    products: Array,
    categories: Array,
  },
  components: {
    ProductItem,
  },
  data() {
    return {
      selectedCategory: 'All',
    };
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
</style>
