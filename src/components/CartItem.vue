<template>
  <div class="cart-item">
    <img :src="item.image" :alt="item.title" />
    <div>
      <button class="del-btn" @click="$emit('delete-item', item.id)">
        <i class="bx bxs-trash-alt"></i>
      </button>
      <p>{{ item.title }}</p>
      <p>{{ formattedPrice }}</p>
      <div class="quantity">
        <span>Quantity:</span>
        <button
          @click="$emit('decrement-qty', item.id)"
          class="qty-btn"
          :class="{ 'disabled-btn': item.quantity === 1 }"
          :disabled="item.quantity === 1"
        >
          -
        </button>
        <input type="text" :value="item.quantity" />
        <button @click="$emit('increment-qty', item.id)" class="qty-btn">
          +
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartItem',
  props: {
    item: Object,
  },
  computed: {
    formattedPrice() {
      return `$${this.item.price.toFixed(2)}`;
    },
  },
  emits: ['delete-item', 'decrement-qty', 'increment-qty'],
};
</script>

<style scoped>
button {
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
}

.del-btn {
  display: block;
  margin-left: auto;
  margin-bottom: 0.5rem;
}

.del-btn i {
  font-size: 1.3rem;
  font-weight: 500;
}

.cart-item {
  overflow: hidden;
  display: flex;
  margin: 1.3rem 0;
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
    100px 100px 80px rgba(0, 0, 0, 0.07);
}

.cart-item img {
  width: 100px;
  object-fit: contain;
  margin-right: 1.3rem;
}

.quantity {
  display: flex;
  align-items: center;
}

.quantity span {
  margin-right: 0.5rem;
}

.qty-btn {
  padding: 0.3em 0.75em;
  font-size: 1rem;
  font-weight: 500;
  background-color: #2c3037;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
}

.qty-btn.disabled-btn {
  background-color: #eff1f3;
  color: #2c3037;
}

input {
  width: 20%;
  font-size: 1rem;
  text-align: center;
  background: transparent;
  border: none;
  outline: none;
  pointer-events: none;
}
</style>
