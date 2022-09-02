import { createRouter, createWebHistory } from 'vue-router';

import ProductList from '../views/ProductList.vue';
import ProductDetails from '../views/ProductDetails.vue';
import ErrorPage from '../components/ErrorPage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: ProductList,
  },
  {
    path: '/products',
    name: 'products',
    redirect: '/',
  },
  {
    path: '/product/:productId',
    name: 'product',
    component: ProductDetails,
    props: true,
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
