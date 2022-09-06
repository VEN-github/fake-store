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
      reviews: [],
      cart: [],
      alertMessage: null,
      showCart: false,
      selectedCategory: 'All',
      productsToShow: 8,
    };
  },
  getters: {
    getAllProducts({ allProducts }) {
      return allProducts;
    },
    getAllCategories({ allCategories }) {
      const categoryValues = Object.values(allCategories ?? {});
      return ['All', ...categoryValues];
    },
    getSingleProduct({ singleProduct }) {
      return singleProduct ?? {};
    },
    getProductReviews({ singleProduct, reviews }) {
      return reviews.filter(review => review.productId == singleProduct?.id);
    },
    getRelatedProducts({ allProducts, singleProduct }) {
      return allProducts?.filter(
        products =>
          products.category === singleProduct?.category && products.id !== singleProduct?.id
      );
    },
    getAllCartItems({ cart }) {
      return cart ?? {};
    },
    showAlertMessage({ alertMessage }) {
      return alertMessage;
    },
    showCart({ showCart }) {
      return showCart;
    },
    cartCount({ cart }) {
      return cart.reduce((previous, current) => previous + current.quantity, 0);
    },
    cartTotal({ cart }) {
      return cart.reduce((previous, current) => previous + current.price * current.quantity, 0);
    },
    filteredProducts({ selectedCategory, allProducts, productsToShow }) {
      return selectedCategory === 'All'
        ? allProducts?.slice(0, productsToShow)
        : allProducts?.filter(item => item.category === selectedCategory).slice(0, productsToShow);
    },
    getSelectedCategory({ selectedCategory }) {
      return selectedCategory;
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
    setProductReviews(state, payload) {
      state.reviews = payload;
    },
    setCartItems(state, payload) {
      state.cart = payload;
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
    setProductsToShow(state, payload) {
      state.productsToShow += payload;
    },
  },
  actions: {
    init({ dispatch }) {
      dispatch('loadProducts');
      dispatch('loadCategories');
      dispatch('loadCartItems');
    },
    loadProducts: async ({ commit }) => {
      try {
        const { data } = await axios.get('https://fakestoreapi.com/products');
        commit('setProducts', data);
      } catch (error) {
        console.error(error);
      }
    },
    loadCategories: async ({ commit }) => {
      try {
        const { data } = await axios.get('https://fakestoreapi.com/products/categories');
        commit('setCategories', data);
      } catch (error) {
        console.error(error);
      }
    },
    loadSingleProduct: async ({ commit }, id) => {
      try {
        const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
        if (!data) {
          router.push('/404');
          return;
        }
        commit('setSingleProduct', data);
      } catch (error) {
        console.error(error);
      }
    },
    loadProductReviews: async ({ state, commit }) => {
      let reviews = await JSON.parse(localStorage.getItem('reviews'));

      if (reviews !== null) {
        commit('setProductReviews', reviews);
        return;
      }
      localStorage.setItem('reviews', JSON.stringify(state.reviews));
    },
    storeProductReviews: async ({ dispatch }, review) => {
      let reviews = await JSON.parse(localStorage.getItem('reviews'));
      reviews.push(review);
      localStorage.setItem('reviews', JSON.stringify(reviews));
      dispatch('loadProductReviews');
    },
    loadCartItems: async ({ state, commit }) => {
      let cartItems = await JSON.parse(localStorage.getItem('cartItems'));

      if (cartItems !== null) {
        commit('setCartItems', cartItems);
        return;
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cart));
    },
    storeCartItems({ dispatch }, items) {
      localStorage.setItem('cartItems', JSON.stringify(items));
      dispatch('loadCartItems');
    },
    addToCart: async ({ state, commit, dispatch }, id) => {
      let cartItems = await JSON.parse(localStorage.getItem('cartItems'));
      const selectedItem = state.allProducts.find(item => item.id === id);
      const existingItem = cartItems.findIndex(item => item.id === selectedItem.id);

      if (existingItem < 0) {
        cartItems.push({ ...selectedItem, quantity: 1 });
        dispatch('storeCartItems', cartItems);
        commit('setAlertMessage', `${selectedItem.title} added to cart.`);
        return;
      }
      cartItems[existingItem].quantity += 1;
      dispatch('storeCartItems', cartItems);
      commit('setAlertMessage', `${selectedItem.title} updated the quantity.`);
    },
    toggleCart({ state, commit }) {
      commit('setShowCart', !state.showCart);
    },
    removeItem: async ({ dispatch }, id) => {
      let cartItems = await JSON.parse(localStorage.getItem('cartItems'));
      const index = cartItems.findIndex(item => item.id === id);
      cartItems.splice(index, 1);
      dispatch('storeCartItems', cartItems);
    },
    increment: async ({ dispatch }, id) => {
      let cartItems = await JSON.parse(localStorage.getItem('cartItems'));
      cartItems.map(item => {
        if (item.id === id) item.quantity += 1;
      });
      dispatch('storeCartItems', cartItems);
    },
    decrement: async ({ dispatch }, id) => {
      let cartItems = await JSON.parse(localStorage.getItem('cartItems'));
      cartItems.map(item => {
        if (item.id === id) item.quantity -= 1;
      });
      dispatch('storeCartItems', cartItems);
    },
    filterCategory({ commit }, category) {
      commit('setSelectedCategory', category);
    },
    productsLoaded({ commit }, el) {
      if (window.innerHeight + window.scrollY >= el.target.all.product.scrollHeight) {
        commit('setProductsToShow', 4);
        return;
      }
    },
  },
  modules: {},
});

export default store;
