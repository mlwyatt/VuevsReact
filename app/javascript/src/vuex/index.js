import Vue from 'vue/dist/vue.esm';
import Vuex from 'vuex';
Vue.use(Vuex);

import TodoItemStore from './stores/todo_item_store';

const store = new Vuex.Store({
  modules: {
    TodoItemStore
  }
});

export default store;
