import { createStore } from 'vuex';
import axios from 'axios';
import router from '@/router';

const store = createStore({
  state() {
    return {
      allProducts: null,
      allCategories: null,
      singleProduct: null,
      cart: [],
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
      context.commit('setCartItems', id);
    },
  },
  modules: {},
});

export default store;
