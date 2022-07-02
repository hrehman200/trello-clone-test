import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SignupView from '../views/SignupView.vue';
import LoginView from '../views/LoginView.vue';
import BoardsView from '../views/BoardsView.vue';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    async beforeEnter(to, from, next) {
      try {
        await store.dispatch('auth/authenticate');
        next('/boards');
      } catch (error) {
        next('/login');
      }
    },
  },
  {
    path: '/signup',
    name: 'signUp',
    component: SignupView,
  },
  {
    path: '/login',
    name: 'logIn',
    component: LoginView,
  },
  {
    path: '/boards',
    name: 'boardsComponent',
    component: BoardsView,
    async beforeEnter(to, from, next) {
      try {
        await store.dispatch('auth/authenticate');
        next();
      } catch (error) {
        next('/login');
      }
    },
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
