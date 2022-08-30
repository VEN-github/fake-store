import { createRouter, createWebHistory } from 'vue-router';

import ProductList from '../views/ProductList.vue';
import ProductDetails from '../views/ProductDetails.vue';
import ErrorPage from '../components/ErrorPage.vue';
import axios from 'axios';
const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/products',
  },
  {
    path: '/products',
    name: 'products',
    component: ProductList,
  },
  {
    path: '/product/:productId',
    name: 'product',
    component: ProductDetails,
    props: true,
    beforeEnter: async (to, _, next) => {
      const { data } = await axios.get('https://fakestoreapi.com/products');
      const product = data.find(product => product.id == to.params.productId);
      if (!product) {
        // redirect to not found
        next('404');
        return;
      }
      to.meta['product'] = product;
      to.meta['relatedProducts'] = data.filter(
        p => p.category === product.category && p.id !== product.id
      );
      next();
    },
  },
  {
    path: '/:notFound(.*)',
    component: ErrorPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_, _2, savedPosition) {
    if (savedPosition) return savedPosition;
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ left: 0, top: 0 });
      }, 500);
    });
  },
});

export default router;
