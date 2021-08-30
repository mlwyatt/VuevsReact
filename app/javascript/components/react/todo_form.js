import React, { Component } from 'react'

export default class TodoForm extends Component {
  constructor() {
    super();

    this.state = {
      id: undefined,
      description: '',
      completed: false,
      errors: []
    }
  }

  componentDidMount(){
    const { match: { params } } = this.props;

    if (params.id) {
      fetch(`/api/v1/todo_items/${params.id}`)
        .then(resp => resp.json())
        .then((resp) => {
          this.setState({
            id: resp.id,
            description: resp.description,
            completed: resp.completed
          });
        })
        .catch(error => console.log(error))
      ;
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    let url = '/api/v1/todo_items';
    let fetchOpts = {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({todo_item: this.state})
    };

    if (this.state.id) {
      url = `${url}/${this.state.id}`;
      // patch is case sensitive
      fetchOpts.method = 'PATCH';
    }

    fetch(url,fetchOpts)
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((resp) => {
        if (resp.success) {
          this.setState({errors: []});
          window.location.replace('/react/todo_items');
        }
        else {
          this.setState({errors: resp.errors});
        }
      })
    ;
  }

  handleInputChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({[name]: value});
  }

  render(){

    return(
      <div>
        <form key={0} onSubmit={this.handleSubmit.bind(this)}>
          <div style={{gridTemplateColumns: 'repeat(3,1fr)', display: 'grid'}}>
            <div>
              <label>
                Description:
                <input
                  type="text"
                  name="description"
                  value={this.state.description}
                  onChange={(e) => this.handleInputChange(e)}
                />
              </label>
            </div>
            <div>
              <label>
                Completed:
                <input
                  type="checkbox"
                  name="completed"
                  checked={this.state.completed}
                  onChange={(e) => this.handleInputChange(e)}
                />
              </label>
            </div>
            <button type="submit">Save</button>
          </div>
        </form>
        {this.state.errors.map((error) =>
          <p key={error}>{error}</p>
        )}
      </div>
    )
  }
}
