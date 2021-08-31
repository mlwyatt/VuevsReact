import Vue from 'vue/dist/vue.esm';
import VueRouter from 'vue-router';
import TodoList from './components/todo_list';
import TodoForm from './components/todo_form';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/vue/todo_items', component: TodoList, name: 'todo_items_path' },
    { path: '/vue/todo_items/new', component: TodoForm, name: 'new_todo_item_path' },
    { path: '/vue/todo_items/:id/edit', component: TodoForm, name: 'edit_todo_item_path' },
  ]
});

export default router;
