<template>
  <table id="todo_items">
    <thead>
      <tr>
        <th>Description</th>
        <th>Completed</th>
        <th>&nbsp;</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="todoItem in todoItems" :key="todoItem.id">
        <td>{{todoItem.description}}</td>
        <td>{{todoItem.completed ? 'Yes' : 'No'}}</td>
        <td>
          <router-link :to="{ name: 'edit_todo_item_path', params: {id: todoItem.id} }">Edit</router-link>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th>&nbsp;</th>
        <th>&nbsp;</th>
        <th>
          <router-link :to="{ name: 'new_todo_item_path' }">New</router-link>
        </th>
      </tr>
    </tfoot>
  </table>
</template>

<script>
  export default {
    name: 'TodoList',
    data() {
      return this.$store.state.TodoItemStore;
    },
    mounted: function() {
      this.$store.dispatch('TodoItemStore/index');
    }
  }
</script>
