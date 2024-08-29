import React from "react";
import PropTypes from 'prop-types';
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import './Header.css';

const Header = ({addTask}) => {
    return (
    <header className="header">
        <h1>todos</h1>
        <NewTaskForm
        addTask = {addTask}/>
    </header>
    )
}

Header.propTypes = {
    addTask:PropTypes.func.isRequired
}

export default Header;