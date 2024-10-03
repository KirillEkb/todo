import PropTypes from 'prop-types';

import buttonsDescription from '../../data/button';
import './TasksFilters.css';
import Button from '../Button/Button';

const TasksFilters = ({ getFiltered, selectedFilter = '' }) => {
  const buttons = buttonsDescription.map((but) => {
    const key = but.id;
    return (
      <li key={key}>
        <Button
          selectedFilter={selectedFilter}
          func={() => {
            getFiltered(key);
          }}
          {...but}
        />
      </li>
    );
  });
  return <ul className="filters">{buttons}</ul>;
};

TasksFilters.propTypes = {
  getFiltered: PropTypes.func,
  selectedFilter: PropTypes.string,
};

export default TasksFilters;
