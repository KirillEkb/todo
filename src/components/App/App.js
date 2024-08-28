import React, {Component} from 'react';

import Header from '../Header/Header'
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

export default class App extends Component {
    maxId = 1;
  
    createTask = (description) => {
        return ({
          id: this.maxId++,
          description,
          completed: false,
          created: 'created 5 minutes ago'
        })
      };

    state = { 
        toDoData: [
        this.createTask('Completed task'),
        this.createTask('Editing task'),
        this.createTask('Active task'),
      ],
        selectedFilter: 'All',
    };

    deleteTask = (id) => {
        this.setState(({toDoData}) => {
          const idx = toDoData.findIndex((el) => el.id===id);
          return {
        toDoData : toDoData.toSpliced(idx,1)
          }
        })
    };
  
    addTask = (description) => {
        const newItem = this.createTask(description)
        this.setState(({toDoData}) =>{
          const newArr = [...toDoData, newItem]
          return {
            toDoData: newArr
          }
        })
    };
   
    onDone = (id) => {
        this.setState(({toDoData}) => {
        const idx = toDoData.findIndex((el) => el.id===id);
        const toDoned = toDoData[idx];
        const doned = {...toDoned, completed: !toDoned.completed};
        const newArr = toDoData.toSpliced(idx,1, doned)
        return {
            toDoData: newArr
        };
    })
  }
  getFiltered = (key) => {
    this.setState({selectedFilter : key});
  }
  clearComplited = () => {
    this.setState(({toDoData}) => {
      const active = toDoData.filter((el) => !el.completed);
      return {
        toDoData: active
      }
    })
  }
  
  
    render() {
      const  {toDoData, selectedFilter} = this.state;
      const doned = toDoData.filter((el) => el.completed);
      const active = toDoData.filter((el) => !el.completed);
      let todos = (selectedFilter === 'All') ? toDoData : selectedFilter === 'Completed'?
      doned: active
      return (<>
        <Header
        addTask = {this.addTask}
        />
        <TaskList
          todos = {todos}
          onDeleted = {this.deleteTask}
          onDone = {this.onDone}
        />
        <Footer 
          active = {toDoData.length - doned.length}
          getFiltered = {this.getFiltered}
          selectedFilter = {selectedFilter}
          clearComplited = {this.clearComplited}
        />
        </>);
    }
  
  };