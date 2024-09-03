//список задач
import { Component } from 'react';
import PropTypes from 'prop-types';

import Task from '../Task/Task';
import './TaskList.css';

export default class TaskList extends Component {
  static propTypes = {
    todos: PropTypes.array,
    onDeleted: PropTypes.func,
    onDone: PropTypes.func,
  };

  render() {
    const { todos, onDeleted, onDone, changeTask } = this.props;
    const elements = todos.map((item) => {
      return (
        <Task
          changeTask={changeTask}
          key={item.id}
          onDeleted={() => onDeleted(item.id)}
          onDone={() => onDone(item.id)}
          {...item}
        />
      );
    });
    return <ul className="todo-list">{elements}</ul>;
  }
}
