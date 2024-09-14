import { Component } from 'react';

import './NewTaskForm.css';
import inputsArr from '../../data/newTaskInputs';

export default class NewTaskForm extends Component {
  state = {
    Task: '',
    Min: '',
    Sec: '',
  };

  onChange = (evt) => {
    this.setState({
      [evt.target.id]: evt.target.value,
    });
  };
  onSubmit = (evt) => {
    evt.preventDefault();
    if (!this.state.Task.trim()) return;
    this.props.addTask(this.state.Task, this.state.Min || 0, this.state.Sec || 0);
    this.setState({
      Task: '',
      Min: '',
      Sec: '',
    });
  };

  render() {
    const inputs = inputsArr.map((input) => {
      const key = input.id;
      return <input key={key} type="text" onChange={this.onChange} value={this.state[key]} {...input} />;
    });

    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        {inputs}
        <button type="submit"></button>
      </form>
    );
  }
}
