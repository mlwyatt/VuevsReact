<template>
  <div>
    <form v-on:submit=handleSubmit>
      <div style="grid-template-columns: repeat(3,1fr); display: grid;">
      <div>
        <label>
          Description:
          <input
              type="text"
              name="description"
              v-model="todoItem.description"
          />
        </label>
      </div>
      <div>
        <label>
          Completed:
          <input
              type="checkbox"
              name="completed"
              v-model="todoItem.completed"
          />
        </label>
      </div>
      <button type="submit">Save</button>
    </div>
    </form>
    <p v-for="error in errors" :key="error">{{error}}</p>
  </div>
</template>


<script>
  export default {
    name: 'TodoForm',
    data() {
      return this.$store.state.TodoItemStore;
    },
    mounted: function() {
      let itemId = this.$route.params.id
      this.$store.dispatch(itemId ? 'TodoItemStore/edit' : 'TodoItemStore/new',itemId);
    },
    methods: {
      handleSubmit(e) {
        e.preventDefault();
        this.$store.dispatch('TodoItemStore/save',this);
      }
    }
  }
</script>
