import Vue from 'vue';
import Router from 'vue-router';
import Home from './home/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/converter',
      name: 'converter',
      component: () => import(/* webpackChunkName: "about" */ './converter/Converter.vue'),
    },
  ],
});
