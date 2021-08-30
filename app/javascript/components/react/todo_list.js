import React, { Component } from 'react'

export default class TodoList extends Component {
  constructor() {
    super();
    this.state = {
      todoItems: []
    }
  }

  componentDidMount(){
    fetch('/api/v1/todo_items')
      .then(resp => resp.json())
      .then(a => {
        this.setState({
          todoItems: a
        });
      })
      .catch(error => console.log(error));
  }


  render(){
    return(
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Completed</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {this.state.todoItems.map((todoItem) =>
            <tr key={todoItem.id}>
              <td>{todoItem.description}</td>
              <td>{todoItem.completed ? 'Yes' : 'No'}</td>
              <td>
                <a href={`todo_items/${todoItem.id}/edit`}>Edit</a>
              </td>
            </tr>
          )}
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
    )
  }
}
