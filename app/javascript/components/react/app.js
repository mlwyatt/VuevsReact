import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {BrowserRouter, Switch, Route} from 'react-router-dom'

import TodoList from './todo_list'
import TodoForm from './todo_form'


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

export default App
