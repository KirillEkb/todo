import { Component } from 'react';

import data from '../../data/data';
import Header from '../Header/Header';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

export default class App extends Component {
  maxId = 1;

  createTask = (Task, Min = 1, Sec = 0) => {
    return {
      id: this.maxId++,
      Task,
      Min,
      Sec,
      completed: false,
      create: new Date(),
    };
  };

  state = {
    toDoData: data.map((el) => this.createTask(el)),
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

  addTask = (Task, Min = 1, Sec = 1) => {
    const newItem = this.createTask(Task, Min, Sec);
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
  changeTask = (changedDescription, newMin, newSec, id) => {
    this.setState(({ toDoData }) => {
      const idx = toDoData.findIndex((el) => el.id === id);
      const toChange = toDoData[idx];
      const changed = { ...toChange, Task: changedDescription, Min: newMin, Sec: newSec };
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

    return (
      <>
        <Header addTask={this.addTask} />
        <TaskList
          todos={toDoData}
          selectedFilter={selectedFilter}
          onDeleted={this.deleteTask}
          onDone={this.onDone}
          changeTask={this.changeTask}
        />
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
