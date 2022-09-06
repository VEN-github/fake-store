<template>
  <div class="container" v-if="singleProduct">
    <div class="product__single">
      <div class="product__single-container">
        <img
          class="product__single-image"
          :src="singleProduct.image"
          :alt="singleProduct.title"
        />
        <div>
          <h4 class="product__single-title">{{ singleProduct.title }}</h4>
          <p class="product__single-price">{{ formattedPrice }}</p>
          <p class="product__single-rating">
            <span class="product__single-label">Rating</span>: {{ rate }}
          </p>
          <p class="product__single-desc">{{ singleProduct.description }}</p>
          <button
            class="btn btn_primary product__single-btn"
            @click.prevent="$emit('add-to-cart', singleProduct.id)"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
    <div class="product__review">
      <h3 class="product__review-title">Ratings & Reviews</h3>
      <div class="product__review--flex">
        <div class="product__review-empty" v-if="!reviews.length">
          <img
            class="product__review-empty-image"
            src="../assets/empty-reviews.svg"
            alt="Illustration for empty reviews"
          />
          <p class="product__review-empty-text">No reviews yet</p>
        </div>
        <ProductReview v-else :reviews="reviews" />
        <div class="product__review-form">
          <h4 class="product__review-form-title">Write a review</h4>
          <form
            @submit.prevent="submitReview"
            class="product__review-form-group"
          >
            <div class="input-group">
              <label class="label" for="name">Name</label>
              <input
                class="input product__review-input"
                type="text"
                name="name"
                id="name"
                v-model.trim="name"
              />
            </div>
            <div class="input-group">
              <label class="label" for="email">Email Address</label>
              <input
                class="input product__review-input"
                type="email"
                name="email"
                id="email"
                v-model.trim="email"
              />
            </div>
            <div class="input-group">
              <label class="label" for="rating">Rating</label>
              <select
                class="input product__review-input"
                name="rating"
                id="rating"
                v-model.number="rating"
              >
                <option value="5">5 stars</option>
                <option value="4">4 stars</option>
                <option value="3">3 stars</option>
                <option value="2">2 stars</option>
                <option value="1">1 star</option>
              </select>
            </div>
            <div class="input-group">
              <label class="label" for="review">Review</label>
              <textarea
                class="input product__review-input"
                name="review"
                id="review"
                rows="10"
                v-model="review"
              />
            </div>
            <input
              type="submit"
              class="btn btn_primary product__review-submit"
              value="Submit a review"
            />
          </form>
        </div>
      </div>
    </div>
    <div class="product__related">
      <h3 class="product__related-title">Related Products</h3>
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
import ProductReview from '../components/ProductReview.vue';
export default {
  name: 'ProductDetails',
  props: {
    productId: String,
  },
  components: {
    Splide,
    SplideSlide,
    ProductItem,
    ProductReview,
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

      name: null,
      email: null,
      rating: 5,
      review: null,
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
    reviews() {
      return this.$store.getters.getProductReviews ?? {};
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
    submitReview() {
      const { productId, email, rating, review } = this;
      if (!this.name && !this.email && !this.review) {
        alert('Please input empty fields');
        return;
      }
      this.$store.dispatch('storeProductReviews', {
        productId,
        email,
        rating,
        review,
      });
      this.name = null;
      this.email = null;
      this.rating = 5;
      this.review = null;
    },
  },
  created() {
    this.loadSingleProduct(this.productId);
    this.$store.dispatch('loadProductReviews');
  },
  watch: {
    productId(newId) {
      this.loadSingleProduct(newId);
    },
  },
};
</script>
