<template>
  <div class="product__review-list">
    <ReviewList v-for="review in reviews" :key="review.id" :review="review" />
  </div>
</template>

<script>
import ReviewList from '../components/ReviewList.vue';
export default {
  name: 'ProductReview',
  props: {
    reviews: Array,
  },
  components: {
    ReviewList,
  },
};
</script>
