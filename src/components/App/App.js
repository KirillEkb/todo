import React, { Component } from 'react';

import Header from '../Header/Header';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

export default class App extends Component {
  maxId = 1;

  createTask = (description) => {
    return {
      id: this.maxId++,
      description,
      completed: false,
      create: new Date(),
    };
  };

  state = {
    toDoData: [this.createTask('Completed task'), this.createTask('Editing task'), this.createTask('Active task')],
    selectedFilter: 'All',
  };

  deleteTask = (id) => {
    this.setState(({ toDoData }) => {
      const idx = toDoData.findIndex((el) => el.id === id);
      return {
        toDoData: toDoData.toSpliced(idx, 1),
      };
    });
  };

  addTask = (description) => {
    const newItem = this.createTask(description);
    this.setState(({ toDoData }) => {
      const newArr = [...toDoData, newItem];
      return {
        toDoData: newArr,
      };
    });
  };

  onDone = (id) => {
    this.setState(({ toDoData }) => {
      const idx = toDoData.findIndex((el) => el.id === id);
      const toDone = toDoData[idx];
      const done = { ...toDone, completed: !toDone.completed };
      const newArr = toDoData.toSpliced(idx, 1, done);
      return {
        toDoData: newArr,
      };
    });
  };
  changeTask = (changedDescription, id) => {
    this.setState(({ toDoData }) => {
      const idx = toDoData.findIndex((el) => el.id === id);
      const toChange = toDoData[idx];
      const changed = { ...toChange, description: changedDescription };
      const newArr = toDoData.toSpliced(idx, 1, changed);
      return {
        toDoData: newArr,
      };
    });
  };
  getFiltered = (key) => {
    this.setState({ selectedFilter: key });
  };
  clearCompleted = () => {
    this.setState(({ toDoData }) => {
      const active = toDoData.filter((el) => !el.completed);
      return {
        toDoData: active,
      };
    });
  };

  render() {
    const { toDoData, selectedFilter } = this.state;
    const done = toDoData.filter((el) => el.completed);
    const active = toDoData.filter((el) => !el.completed);
    let todos = selectedFilter === 'All' ? toDoData : selectedFilter === 'Completed' ? done : active;
    return (
      <>
        <Header addTask={this.addTask} />
        <TaskList todos={todos} onDeleted={this.deleteTask} onDone={this.onDone} changeTask={this.changeTask} />
        <Footer
          active={toDoData.length - done.length}
          getFiltered={this.getFiltered}
          selectedFilter={selectedFilter}
          clearCompleted={this.clearCompleted}
        />
      </>
    );
  }
}
