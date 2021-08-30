import Vue from 'vue'
import TodoList from "../../components/vue/todo_list";
import TodoForm from "../../components/vue/todo_form";

import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
  { path: '/vue/todo_items', component: TodoList },
  { path: '/vue/todo_items/new', component: TodoForm },
  { path: '/vue/todo_items/:id/edit', component: TodoForm },
]

const router = new VueRouter({ routes });

document.addEventListener('DOMContentLoaded', () => {
  // window.app = new Vue({ router }).$mount('#app');
  window.app = new Vue({
    el: '#app'
  });
});
