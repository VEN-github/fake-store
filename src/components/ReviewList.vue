<template>
  <div class="product__review-card">
    <div class="product__review-card--flex">
      <div>
        <p class="product__review-card-header-name">{{ review.name }}</p>
        <p class="product__review-card-header-email">{{ review.email }}</p>
      </div>
      <p class="product__review-card-header-rating">
        Rating: {{ review.rating }}
        <StarRating v-for="rate in rating" :key="rate" :isShaded="rate" />
      </p>
    </div>
    <div class="product__review-card-body">{{ review.review }}</div>
  </div>
</template>

<script>
import StarRating from './StarRating.vue';
export default {
  name: 'ReviewList',
  props: {
    review: Object,
  },
  components: {
    StarRating,
  },
  computed: {
    rating() {
      const defaultStar = Array(5).map(() => false);
      for (let i = 0; i < this.review.rating; i++) {
        defaultStar[i] = true;
      }
      return defaultStar;
    },
  },
};
</script>
