<template>
  <div class="container">
    <div class="error-page-container">
      <img
        class="error-illustration"
        src="../assets/page-not-found.svg"
        alt="Illustration of Page not found"
      />
      <h4>Page not found</h4>
      <router-link to="/products">Back to Home</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: '404Page',
};
</script>

<style scoped>
.error-page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 4rem 0;
}

.error-illustration {
  max-width: 100%;
  height: auto;
  margin-bottom: 2rem;
}

h4 {
  margin-bottom: 1rem;
  font-size: 3rem;
  font-weight: 500;
  color: #2c3037;
}

a {
  text-decoration: none;
  padding: 0.5em 0.75em;
  font-size: 1.125rem;
  background-color: #e07a5f;
  color: #fff;
  border: none;
  outline: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.5s ease;
}

a:hover {
  background-color: #ee6c4d;
}
</style>
