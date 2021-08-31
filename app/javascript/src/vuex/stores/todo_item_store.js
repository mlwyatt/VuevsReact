const TodoItemStore = {
  namespaced: true,
  state: {
    todoItems: [],
    todoItem: {},
    errors: [],
  },
  mutations: {
    one(state, todoItem) {
      state.errors = [];
      state.todoItem = todoItem;
      return state;
    },
    many(state, todoItems) {
      state.todoItems = todoItems;
      return state;
    },
    addErrors(state,errors) {
      state.errors = errors;
      return state
    }
  },
  actions: {
    index(context, query) {
      fetch('/api/v1/todo_items')
        .then(resp => resp.json())
        .then(data => {
          context.commit('many', data)
        })
        .catch(error => console.log(error))
      ;
    },
    edit(context, id) {
      fetch(`/api/v1/todo_items/${id}`)
        .then(resp => resp.json())
        .then((data) => {
          context.commit('one', data)
        })
        .catch(error => console.log(error))
      ;
    },
    new(context) {
      context.commit('one', {});
    },
    save(context,component) {
      const todoItem = component.todoItem;
      let url = '/api/v1/todo_items';
      let fetchOpts = {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({todo_item: todoItem})
      };

      if (todoItem.id) {
        url = `${url}/${todoItem.id}`;
        // patch is case sensitive
        fetchOpts.method = 'PATCH';
      }

      fetch(url,fetchOpts)
        .then((response) => response.ok ? response.json() : Promise.reject())
        .then((resp) => {
          if (resp.success) {
            context.commit('addErrors',[]);
            component.$router.push({ name: 'todo_items_path' });
          }
          else {
            context.commit('addErrors',resp.errors);
          }
        })
      ;
    }
  }
};

export default TodoItemStore;
