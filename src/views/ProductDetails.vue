<template>
  <div class="container" v-if="singleProduct">
    <div class="single-product">
      <div class="product_details-container">
        <img class="product-image" :src="singleProduct.image" alt="" />
        <div class="product-details">
          <h4 class="product-title">{{ singleProduct.title }}</h4>
          <p class="product-price">{{ formattedPrice }}</p>
          <p class="product-rating">
            <span>Rating</span> : {{ rate }}{{ rateCount }}
          </p>
          <p class="product-desc">{{ singleProduct.description }}</p>
          <button
            class="btn_add-to-cart"
            @click.prevent="$emit('add-to-cart', singleProduct.id)"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
    <div class="related-products-container">
      <h3 class="related-products-header">Related Products</h3>
      <Splide
        :options="{
          rewind: true,
          type: 'loop',
          perPage: 3,
          perMove: 1,
          autoplay: true,
          lazyLoad: 'nearby',
          pagination: false,
          breakpoints: {
            640: {
              perPage: 1,
            },
            948: {
              perPage: 2,
            },
          },
        }"
      >
        <SplideSlide v-for="product in products" :key="product.id">
          <ProductItem size="sm" :product="product" :productId="product.id" />
        </SplideSlide>
      </Splide>
    </div>
  </div>
</template>

<script>
//import axios from 'axios';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';
import ProductItem from '../components/ProductItem.vue';
export default {
  name: 'ProductDetails',
  props: {
    productId: String,
  },
  components: {
    Splide,
    SplideSlide,
    ProductItem,
  },
  data() {
    return {
      products: [],
      singleProduct: null,
    };
  },
  computed: {
    formattedPrice() {
      return `$${this.singleProduct?.price?.toFixed(2)}`;
    },
    rate() {
      return this.singleProduct?.rating?.rate;
    },
    rateCount() {
      return `(${this.singleProduct?.rating?.count})`;
    },
  },
  methods: {
    loadProducts(route) {
      this.singleProduct = route.meta.product;
      this.products = route.meta.relatedProducts;
    },
  },
  created() {
    this.loadProducts(this.$route);
  },
  watch: {
    $route(newRoute) {
      this.loadProducts(newRoute);
    },
  },
};
</script>

<style scoped>
.single-product {
  display: grid;
  place-items: center;
  margin-bottom: 8rem;
}

.product_details-container {
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 4rem;
  padding: 4rem;
  border: 2px solid #76787a;
  border-radius: 10px;
}

.product-image {
  width: 380px;
  max-width: 100%;
  height: auto;
  object-fit: cover;
  margin-right: 3rem;
}

.product-title {
  font-size: 2.5rem;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 400;
}

.product-rating {
  margin-bottom: 1.2rem;
  font-size: 1rem;
}

.product-rating span {
  font-weight: 500;
}

.product-desc {
  margin-bottom: 2rem;
  font-size: 1.125rem;
  text-align: justify;
}

.btn_add-to-cart {
  width: 100%;
  margin-bottom: 2rem;
  padding: 0.75em;
  font-size: 1.125rem;
  font-weight: 500;
  background-color: #e07a5f;
  color: #fff;
  border: none;
  outline: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.5s ease-in;
}

.btn_add-to-cart:hover {
  background-color: #ee6c4d;
}

.related-products-container {
  margin-bottom: 5rem;
}

.related-products-header {
  margin-bottom: 2.5rem;
  font-size: 1.75rem;
  font-weight: 500;
}
</style>
