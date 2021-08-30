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
              v-on:change="handleInputChange"
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
              v-on:change="handleInputChange"
          />
        </label>
      </div>
      <button type="submit">Save</button>
    </div>
    </form>
    <p v-for="error in todoItem.errors" :key="error">{{error}}</p>
  </div>
</template>


<script>
  export default {
    name: 'TodoForm',
    data() {
      return {
        todoItem: {
          id: undefined,
          description: '',
          completed: false,
          errors: []
        }
      }
    },
    created() {
      const id = this.$route.params.id;

      if (id) {
        fetch(`/api/v1/todo_items/${id}`)
            .then(resp => resp.json())
            .then((resp) => {
              this.todoItem.id = resp.id;
              this.todoItem.description = resp.description;
              this.todoItem.completed = resp.completed;
            })
            .catch(error => console.log(error))
        ;
      }
    },
    methods: {
      handleInputChange(e) {
        const target = e.target;
        this.todoItem[target.name] = target.type === 'checkbox' ? target.checked : target.value;
      },
      handleSubmit(e) {
        e.preventDefault();

        let url = '/api/v1/todo_items';
        let fetchOpts = {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({todo_item: this.todoItem})
        };

        if (this.id) {
          url = `${url}/${this.id}`;
          // patch is case sensitive
          fetchOpts.method = 'PATCH';
        }

        fetch(url,fetchOpts)
            .then((response) => response.ok ? response.json() : Promise.reject())
            .then((resp) => {
              if (resp.success) {
                this.todoItem.errors = [];
                window.location.replace('/vue/todo_items');
              }
              else {
                this.todoItem.errors = resp.errors;
              }
            });
      }
    }
  }
</script>
