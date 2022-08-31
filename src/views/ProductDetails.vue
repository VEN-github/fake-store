<template>
  <div class="container" v-if="singleProduct">
    <div class="product__single">
      <div class="product__single__container">
        <img
          class="product__single__image"
          :src="singleProduct.image"
          :alt="singleProduct.title"
        />
        <div>
          <h4 class="product__single__title">{{ singleProduct.title }}</h4>
          <p class="product__single__price">{{ formattedPrice }}</p>
          <p class="product__single__rating">
            <span class="product__single__label">Rating</span>: {{ rate }}
          </p>
          <p class="product__single__desc">{{ singleProduct.description }}</p>
          <button
            class="btn btn--primary product__single__btn"
            @click.prevent="$emit('add-to-cart', singleProduct.id)"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
    <div class="product__related">
      <h3 class="product__related__title">Related Products</h3>
      <Splide :options="splideOptions">
        <SplideSlide v-for="product in relatedProducts" :key="product.id">
          <ProductItem size="sm" :product="product" />
        </SplideSlide>
      </Splide>
    </div>
  </div>
</template>

<script>
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
      splideOptions: {
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
      },
    };
  },
  computed: {
    formattedPrice() {
      return `$${this.singleProduct?.price?.toFixed(2)}`;
    },
    rate() {
      const { rate, count } = this.singleProduct?.rating ?? {};
      return `${rate} (${count})`;
    },
    singleProduct() {
      return this.$store.getters.getSingleProduct ?? {};
    },
    relatedProducts() {
      return this.$store.getters.getRelatedProducts ?? {};
    },
  },
  methods: {
    loadSingleProduct(productId) {
      this.$store.commit('setSingleProduct', '');
      this.$store.dispatch('loadSingleProduct', productId);
    },
  },
  created() {
    this.loadSingleProduct(this.productId);
  },
  watch: {
    productId(newId) {
      this.loadSingleProduct(newId);
    },
  },
};
</script>
