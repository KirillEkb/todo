//футер с информацией и кнопками
import React from 'react';
import PropTypes from 'prop-types';

import TasksFilters from '../TasksFilters/TasksFilters';
import './Footer.css';
import Button from '../Button/Button';

const Footer = ({ active, getFiltered, selectedFilter, clearCompleted }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{active} items left</span>
      <TasksFilters getFiltered={getFiltered} selectedFilter={selectedFilter} />
      <Button func={clearCompleted} id="clear-completed" className="clear-completed" text="Clear completed" />
    </footer>
  );
};

Footer.defaultProps = {
  active: 0,
  selectedFilter: 'All',
};

Footer.propTypes = {
  active: PropTypes.number,
  getFiltered: PropTypes.func,
  selectedFilter: PropTypes.string,
  clearCompleted: PropTypes.func,
};

export default Footer;
