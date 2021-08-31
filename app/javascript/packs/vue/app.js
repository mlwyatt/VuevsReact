import Vue from 'vue/dist/vue.esm';
import store from '../../src/vuex';
import router from '../../src/routes';

window.vueApp = new Vue({
  el: '#app',
  router,
  store
});
