//фильтры в футере
import React, { Component } from "react";
import './TasksFilters.css';
import Button from '../Button/Button';

export default class TasksFilters extends Component {
  state = {
    button: [
      {id:'All', className:'', text:'All'},
      {id:'Active', className:'', text:'Active'},
      {id:'Completed', className:'', text:'Completed'}
    ],
  }
  

  render() {
    const {getFiltered, selectedFilter}  = this.props;
    const buttons = this.state.button.map((but) => {
      const key = but.id;
    return(
      <li key = {key}>
        <Button
        selectedFilter = {selectedFilter}
        key = {but.id}       
        func = { () =>{getFiltered(key)}}
        {...but}
        />
      </li>
    )
    })
    return (

      <ul className="filters">
        {buttons}
      </ul>
  )
  }
  
}


TasksFilters.defaultProps = {
  getFiltered: () => {},
  selectedFilter : ''
}
