//форма для добавления
import React, { Component } from 'react';
import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  state = {
    description: '',
  };

  onChange = (evt) => {
    this.setState({ description: evt.target.value });
  };
  onEnter = (evt) => {
    if (evt.code === 'Enter' && evt.target.value.trim()) {
      this.props.addTask(this.state.description);
      this.setState({ description: '' });
    }
  };
  render() {
    return (
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={this.state.description}
        autoFocus
        onChange={this.onChange}
        onKeyUp={this.onEnter}
      />
    );
  }
}
