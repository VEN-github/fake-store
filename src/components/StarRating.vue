template
<template>
  <i
    class="product__review-card-header-rating-star bx bx-star"
    :class="{ 'bxs-star': isShaded }"
  ></i>
</template>

<script>
export default {
  name: 'StarRating',
  props: {
    isShaded: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
