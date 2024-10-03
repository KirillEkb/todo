import { useState } from 'react';

import './NewTaskForm.css';
import inputsArr from '../../data/newTaskInputs';

const NewTaskForm = ({ addTask }) => {
  const [Task, setTask] = useState('');
  const [Min, setMin] = useState('');
  const [Sec, setSec] = useState('');

  const onChange = (evt) => {
    const { id, value } = evt.target;
    if (id === 'Task') {
      setTask(value);
    } else if (id === 'Min') {
      setMin(value);
    } else if (id === 'Sec') {
      setSec(value);
    }
  };
  const onSubmit = (evt) => {
    evt.preventDefault();
    if (!Task.trim()) return;
    addTask(Task, Min || 0, Sec || 0);
    setTask('');
    setMin('');
    setSec('');
  };

  const inputs = inputsArr.map((input) => {
    const key = input.id;
    return (
      <input
        key={key}
        type="text"
        onChange={onChange}
        value={key === 'Task' ? Task : key === 'Min' ? Min : Sec}
        {...input}
      />
    );
  });

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      {inputs}
      <button type="submit"></button>
    </form>
  );
};

export default NewTaskForm;
