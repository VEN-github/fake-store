<template>
  <div class="container">
    <div
      class="categories"
      :class="{ 'categories--open': showCategories }"
      @click="toggleCategories()"
    >
      <div class="categories__header">
        <span class="categories__title">Categories</span><span class="categories__icon">+</span>
      </div>
      <ul class="category">
        <li
          class="category__list"
          :class="{
            'category__list--active': selectedCategory === category,
          }"
          v-for="(category, index) in categories"
          :key="index"
        >
          <span class="category__name" @click="filterCategory(category)">{{ category }}</span>
        </li>
      </ul>
    </div>
    <div id="product" class="product">
      <ProductItem
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        showButton
        @add-to-cart="$emit('add-to-cart', $event)"
      />
    </div>
  </div>
</template>

<script>
import ProductItem from '../components/ProductItem.vue';

export default {
  name: 'ProductList',
  props: {
    categories: Array,
  },
  components: {
    ProductItem,
  },
  data() {
    return {
      showCategories: false,
    };
  },
  computed: {
    filteredProducts() {
      return this.$store.getters.filteredProducts;
    },
    selectedCategory() {
      return this.$store.getters.getSelectedCategory;
    },
  },
  methods: {
    toggleCategories() {
      this.showCategories = !this.showCategories;
    },
    filterCategory(category) {
      this.$store.dispatch('filterCategory', category);
    },
    onScroll(el) {
      this.$store.dispatch('productsLoaded', el);
    },
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  },
};
</script>
