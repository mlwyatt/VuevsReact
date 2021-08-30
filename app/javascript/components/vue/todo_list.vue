<script>
  export default {
    name: 'TodoList',
    data() {
      return {
        todoItems: []
      };
    },
    created() {
      fetch('/api/v1/todo_items')
        .then(resp => resp.json())
        .then(a => {
          this.todoItems = a
        })
        .catch(error => console.log(error))
      ;
    }
  }
</script>

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
          <a :href="`todo_items/${todoItem.id}/edit`">Edit</a>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th>&nbsp;</th>
        <th>&nbsp;</th>
        <th>
          <a href="todo_items/new">New</a>
        </th>
      </tr>
    </tfoot>
  </table>
</template>
