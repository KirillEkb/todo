//одна задача
import React, {Component} from "react";
import './Task.css';
import Button from '../Button/Button';
import Checkbox from "../Checkbox/Checkbox";


export default class Task extends Component {

  render() {
  const {description, onDeleted, onDone, created, completed} = this.props;
  let classNames = '';
  let checked = false;
 if (completed) {
  classNames += 'completed';
  checked = true;
 };

 
  return (
    <li
      className= {classNames}
    >   
      <div>
        <Checkbox
          checked = {checked}
          onChange = {onDone}
          id='toggle' 
          className="toggle" 
        />
        <label>
          <span className='description' >{description}</span>
          <span className="created">{created}</span>
        </label>
        <Button id='icon-edit' className='icon icon-edit' text=''/>
        <Button func={onDeleted} id='icon-destroy' className='icon icon-destroy' text=''/>
      </div>
    </li>)
};
}