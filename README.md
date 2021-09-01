# Both are great
  - It is so nice not having to manually update HTML via JS
    - For example, creating a `todo_item` without a description will throw a validation error
    - This validation error is rendered from the controller as JSON
    - Both React and Vue can just display it via the state of the component
      - React: `{this.state.errors.map((error) => <p key={error}>{error}</p>)}`
      - Vue: `<p v-for="error in errors" :key="error">{{error}}</p>`

# React
- You render the `App` component on page load
  - This contains the routes, which didn't feel right
  - Side note: I haven't learned if/how to use links properly
  - ```javascript
    class App extends Component {
      render(){
        return(
          <BrowserRouter>
            <Switch>
              <Route exact path="/react/" render={() => (<a href="react/todo_items">Items</a>)} />
              <Route exact path="/react/todo_items" component={TodoList} />
              <Route exact path="/react/todo_items/new" component={TodoForm} />
              <Route exact path="/react/todo_items/:id/edit" component={TodoForm} />
            </Switch>
          </BrowserRouter>
        )
      }
    }
    ```
- Major downfall/issue \#1:
  - You must keep track of the component's state manually, including form fields
  - ```javascript
      handleInputChange(e) {
        const target = e.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        // update this.state.completed
        this.setState({[name]: value});
      }
    
      render() {
        <input
          type="checkbox"
          name="completed"
          checked={this.state.completed}
          onChange={(e) => this.handleInputChange(e)}
        />
      }
    ```
  - This may be easier with Redux, but I haven't read anything about it yet
  - Because of this, the component feels a bit bloated.
    - React's TodoForm is twice the size as Vue's TodoForm
      - This state management is in another location for Vue

# Vue
  - \#1 thing I like more about Vue, is a separation of concerns
    - Routes are in their own file, the html in its own file, the database/api calling in its own file
  - I would say a bit of a steep learning curve, at least when compared to React
    - I am not comfortable with coding Vue yet, by any means
    - Has new v-* attributes
      - See `<p v-for="error in errors" :key="error">{{error}}</p>`
      - Or `<input type="text" v-model="todoItem.description" />`
  - You have to use `<router-link>`s for all your links so you can use the defined routes
    - `<router-link :to="{ name: 'new_todo_item_path' }">New</router-link>`
  - State is managed via "Stores" and Vuex
    - Feels similar to a Rails controller
      - ```javascript
          // todo_list.vue
          // function is fired when component is first loaded/mounted
          mounted: function() {
            this.$store.dispatch('TodoItemStore/index');
          }
        
          // todo_item_store.js
          const TodoItemStore = {
            // other properties
            actions: {
              index(context,query) {
                fetch('/api/v1/todo_items')
                  .then(resp => resp.json())
                  .then(data => {
                    context.commit('many', data)
                  })
                  .catch(error => console.log(error))
                ;
              }
            }
          };
        ```
  - According to [this](https://krausest.github.io/js-framework-benchmark/current.html) JS performance website, Vue is faster than React
    - I read somewhere that this is because Vue doesn't have all the overhead of a VDOM and it doesn't have to re-render children when the parent's state changes
