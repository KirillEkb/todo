import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Task.css';
import { formatDistanceToNow } from 'date-fns';

import Button from '../Button/Button';
import Checkbox from '../Checkbox/Checkbox';

const Task = (props) => {
  const { completed = false, selectedFilter, Task, create, onDeleted, onDone, id, changeTask, Min, Sec } = props;
  const [classNames, setClassNames] = useState('');
  const [label, setLabel] = useState('');
  const [Secs, setSecs] = useState(parseInt(Sec) + Min * 60);
  const [TimerId, setTimerId] = useState();
  useEffect(() => {
    return () => clearInterval(TimerId);
  }, [Min, Sec, TimerId]);

  useEffect(() => {
    if (completed) {
      setClassNames((prevClassNames) => prevClassNames + ' completed');
    } else {
      setClassNames((prevClassNames) => prevClassNames.replace('completed', ''));
    }
  }, [completed]);

  useEffect(() => {
    if (selectedFilter === 'Active' && completed) {
      setClassNames((prevClassNames) => prevClassNames + ' hidden');
    } else if (selectedFilter === 'Completed' && !completed) {
      setClassNames((prevClassNames) => prevClassNames + ' hidden');
    } else {
      setClassNames((prevClassNames) => prevClassNames.replace('hidden', ''));
    }
  }, [selectedFilter, completed]);

  const onChange = (evt) => {
    setLabel(evt.target.value);
  };

  const onEnter = (evt) => {
    if (evt.code === 'Enter' && evt.target.value.trim()) {
      setLabel('');
      setClassNames((prevClassNames) => prevClassNames.replace('editing', ''));
      changeTask(label, Secs / 60, Secs % 60, id);
      onStartTimer();
    }
    if (evt.code === 'Escape') {
      setClassNames((prevClassNames) => prevClassNames.replace('editing', ''));
    }
  };

  const onEdit = () => {
    setClassNames((prevClassNames) => prevClassNames + ' editing');
    setLabel(Task);
    document.addEventListener('click', (evt) => {
      if (evt.target !== document.activeElement) {
        setClassNames('');
        setLabel(Task);
      }
    });
  };

  const onChangeTimer = (Secs) => {
    return `${Math.floor(Secs / 60)}:${Secs % 60}`;
  };

  const onStartTimer = () => {
    if (TimerId) {
      clearInterval(TimerId);
    }
    const newTimerId = setInterval(() => {
      setSecs((prevSecs) => {
        if (prevSecs <= 0) {
          clearInterval(newTimerId);
          return 0;
        }
        return prevSecs - 1;
      });
    }, 1000);
    setTimerId(newTimerId);
  };

  const onStopTimer = () => {
    clearInterval(TimerId);
  };

  const created = formatDistanceToNow(create, { addSuffix: true, includeSeconds: true });
  const timer = onChangeTimer(Secs);
  let checked = completed;

  return (
    <li className={classNames}>
      <div className="view">
        <Checkbox checked={checked} onChange={onDone} id="toggle" className="toggle" />
        <label>
          <span className="title">{Task}</span>
          <span className="description">
            <Button func={onStartTimer} id="icon-play" className="icon icon-play" text="" />
            <Button func={onStopTimer} id="icon-pause" className="icon icon-pause" text="" />
            {timer}
          </span>
          <span className="description">created {created}</span>
        </label>
        <Button func={onEdit} id="icon-edit" className="icon icon-edit" text="" />
        <Button func={onDeleted} id="icon-destroy" className="icon icon-destroy" text="" />
      </div>
      <input value={label} onChange={onChange} onKeyUp={onEnter} type="text" className="edit"></input>
    </li>
  );
};

Task.propTypes = {
  Task: PropTypes.string.isRequired,
  create: PropTypes.object.isRequired,
  onDeleted: PropTypes.func,
  onDone: PropTypes.func,
  completed: PropTypes.bool,
};

export default Task;
