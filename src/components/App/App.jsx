import { useState } from 'react';

import data from '../../data/data';
import Header from '../Header/Header';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

const App = () => {
  const createTask = (Task, Min = 1, Sec = 0) => {
    return {
      id: (Task + Min + Sec).toString(),
      Task,
      Min,
      Sec,
      completed: false,
      create: new Date(),
    };
  };
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [toDoData, setToDoData] = useState(data.map((el) => createTask(el)));

  const deleteTask = (id) => {
    setToDoData((toDoData) => toDoData.filter((el) => el.id !== id));
  };

  const addTask = (Task, Min = 1, Sec = 1) => {
    const newItem = createTask(Task, Min, Sec);
    setToDoData((toDoData) => [...toDoData, newItem]);
  };

  const onDone = (id) => {
    setToDoData((toDoData) => toDoData.map((el) => (el.id === id ? { ...el, completed: !el.completed } : el)));
  };
  const changeTask = (changedDescription, newMin, newSec, id) => {
    setToDoData((toDoData) =>
      toDoData.map((el) => (el.id === id ? { ...el, Task: changedDescription, Min: newMin, Sec: newSec } : el))
    );
  };
  const getFiltered = (key) => {
    setSelectedFilter(key);
  };
  const clearCompleted = () => {
    setToDoData((toDoData) => toDoData.filter((el) => !el.completed));
  };
  const done = toDoData.filter((el) => el.completed);

  return (
    <>
      <Header addTask={addTask} />
      <TaskList
        todos={toDoData}
        selectedFilter={selectedFilter}
        onDeleted={deleteTask}
        onDone={onDone}
        changeTask={changeTask}
      />
      <Footer
        active={toDoData.length - done.length}
        getFiltered={getFiltered}
        selectedFilter={selectedFilter}
        clearCompleted={clearCompleted}
      />
    </>
  );
};

export default App;
