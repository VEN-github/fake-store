<template>
  <div class="container">
    <div class="error">
      <img
        class="error__illustration"
        src="../assets/page-not-found.svg"
        alt="Illustration of Page not found"
      />
      <h4 class="error__title">Page not found</h4>
      <router-link class="btn btn_primary" to="/">Back to Home</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: '404Page',
};
</script>
