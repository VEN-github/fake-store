import { createStore } from 'vuex';
import axios from 'axios';
import router from '@/router';
import 'mosha-vue-toastify/dist/style.css';
import { createToast } from 'mosha-vue-toastify';

const store = createStore({
  state() {
    return {
      allProducts: null,
      allCategories: null,
      singleProduct: null,
      cart: [],
      alertMessage: null,
      showCart: false,
      selectedCategory: 'All',
    };
  },
  getters: {
    getAllProducts(state) {
      return state.allProducts;
    },
    getAllCategories(state) {
      const categoryValues = Object.values(state.allCategories ?? {});
      return ['All', ...categoryValues];
    },
    getSingleProduct(state) {
      return state.singleProduct ?? {};
    },
    getRelatedProducts(state) {
      const relatedProducts = state.allProducts.filter(
        products =>
          products.category === state.singleProduct?.category &&
          products.id !== state.singleProduct?.id
      );
      return relatedProducts;
    },
    getAllCartItems(state) {
      return state.cart ?? {};
    },
    showAlertMessage(state) {
      return state.alertMessage;
    },
    showCart(state) {
      return state.showCart;
    },
    cartTotal(state) {
      return state.cart.reduce(
        (previous, current) => previous + current.price * current.quantity,
        0
      );
    },
    filteredProducts(state) {
      return state.selectedCategory === 'All'
        ? state.allProducts
        : state.allProducts.filter(
            item => item.category === state.selectedCategory
          );
    },
    getSelectedCategory(state) {
      return state.selectedCategory;
    },
  },
  mutations: {
    setProducts(state, payload) {
      state.allProducts = payload;
    },
    setCategories(state, payload) {
      state.allCategories = payload;
    },
    setSingleProduct(state, payload) {
      state.singleProduct = payload;
    },
    setCartItems(state, payload) {
      state.cart.push(payload);
    },
    setAlertMessage(state, payload) {
      const alert = createToast(payload, {
        hideProgressBar: true,
        showIcon: true,
        swipeClose: false,
        timeout: 1000,
        position: 'top-center',
        type: 'success',
        transition: 'slide',
      });
      state.alertMessage = alert;
    },
    setShowCart(state, payload) {
      state.showCart = payload;
    },
    setSelectedCategory(state, payload) {
      state.selectedCategory = payload;
    },
  },
  actions: {
    init(context) {
      context.dispatch('loadProducts');
      context.dispatch('loadCategories');
    },
    loadProducts: async context => {
      try {
        const { data } = await axios.get('https://fakestoreapi.com/products');
        context.commit('setProducts', data);
      } catch (error) {
        console.error(error);
      }
    },
    loadCategories: async context => {
      try {
        const { data } = await axios.get(
          'https://fakestoreapi.com/products/categories'
        );
        context.commit('setCategories', data);
      } catch (error) {
        console.error(error);
      }
    },
    loadSingleProduct: async (context, id) => {
      try {
        const { data } = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        if (!data) {
          router.push('/404');
          return;
        }
        context.commit('setSingleProduct', data);
      } catch (error) {
        console.error(error);
      }
    },
    addToCart(context, id) {
      const selectedItem = context.state.allProducts.find(
        item => item.id === id
      );
      const existingItem = context.state.cart.findIndex(
        item => item.id === selectedItem.id
      );
      let message = '';
      if (existingItem < 0) {
        context.commit('setCartItems', { ...selectedItem, quantity: 1 });
        message = `${selectedItem.title} added to cart.`;
        context.commit('setAlertMessage', message);
        return;
      }
      context.state.cart[existingItem].quantity += 1;
      message = `${selectedItem.title} updated the quantity.`;
      context.commit('setAlertMessage', message);
    },
    toggleCart(context) {
      context.commit('setShowCart', !context.state.showCart);
    },
    removeItem(context, id) {
      const index = context.state.cart.findIndex(item => item.id === id);
      context.state.cart.splice(index, 1);
    },
    increment(context, id) {
      context.state.cart.map(item => {
        if (item.id === id) item.quantity += 1;
      });
    },
    decrement(context, id) {
      context.state.cart.map(item => {
        if (item.id === id) item.quantity -= 1;
      });
    },
    filterCategory(context, category) {
      context.commit('setSelectedCategory', category);
    },
  },
  modules: {},
});

export default store;
