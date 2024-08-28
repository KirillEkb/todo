//список задач
import React, {Component} from "react";
import Task from "../Task/Task";
import './TaskList.css';

class TaskList extends Component {
    render() {
        const {todos, onDeleted, onDone} = this.props;
        const elements  = todos.map((item) => {
            return (
                <Task
                 key = {item.id}
                 onDeleted = {() => onDeleted(item.id)}
                 onDone = {() => onDone(item.id)}
                {...item}
                />
            )
        }
    )
        return (
        <ul className = "todo-list">
        {elements}
        </ul>)
    }

}


export default TaskList;