import PropTypes from 'prop-types';

import Task from '../Task/Task';
import './TaskList.css';

const TaskList = ({ todos, onDeleted, onDone, changeTask, selectedFilter }) => {
  const elements = todos.map((item) => {
    return (
      <Task
        selectedFilter={selectedFilter}
        changeTask={changeTask}
        key={item.id}
        onDeleted={() => onDeleted(item.id)}
        onDone={() => onDone(item.id)}
        {...item}
      />
    );
  });
  return <ul className="todo-list">{elements}</ul>;
};

TaskList.propTypes = {
  todos: PropTypes.array,
  onDeleted: PropTypes.func,
  onDone: PropTypes.func,
  changeTask: PropTypes.func,
  selectedFilter: PropTypes.string,
};

export default TaskList;
