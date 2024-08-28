//футер с информацией и кнопками
import React from "react";
import TasksFilters from "../TasksFilters/TasksFilters";
import './Footer.css';
import Button from '../Button/Button';


const Footer = ({active = 0, getFiltered, selectedFilter, clearComplited}) => {
return (<footer className="footer">
<span className="todo-count">{active} items left</span>
<TasksFilters
    getFiltered = {getFiltered}
    selectedFilter = {selectedFilter}
/>
<Button func = {clearComplited} id='clear-completed' className='clear-completed' text='Clear completed'/>

</footer>)
}

export default Footer;