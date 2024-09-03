//фильтры в футере
import { Component } from 'react';

import importedButtons from '../../data/button';
import './TasksFilters.css';
import Button from '../Button/Button';

export default class TasksFilters extends Component {
  buttonsDescription = importedButtons;

  render() {
    const { getFiltered, selectedFilter } = this.props;
    const buttons = this.buttonsDescription.map((but) => {
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
  }
}

TasksFilters.defaultProps = {
  getFiltered: () => {},
  selectedFilter: '',
};
