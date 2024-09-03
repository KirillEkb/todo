//форма для добавления
import { Component } from 'react';
import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  state = {
    description: '',
  };

  onChange = (evt) => {
    this.setState({ description: evt.target.value });
  };
  onSubmit = (evt) => {
    evt.preventDefault();
    this.props.addTask(this.state.description);
    this.setState({ description: '' });
  };
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          required
          type="text"
          pattern="\S.*"
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.description}
          autoFocus
          onChange={this.onChange}
        />
      </form>
    );
  }
}
