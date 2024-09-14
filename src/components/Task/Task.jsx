import { Component } from 'react';
import PropTypes from 'prop-types';
import './Task.css';
import { formatDistanceToNow } from 'date-fns';

import Button from '../Button/Button';
import Checkbox from '../Checkbox/Checkbox';

export default class Task extends Component {
  static defaultProps = {
    completed: false,
    editing: false,
  };

  static propTypes = {
    Task: PropTypes.string.isRequired,
    create: PropTypes.object.isRequired,
    onDeleted: PropTypes.func,
    onDone: PropTypes.func,
    completed: PropTypes.bool,
  };
  state = {
    classNames: '',
    label: '',
    Min: '',
    Sec: '',
  };
  TimerId;
  componentDidMount() {
    this.setState({ Min: this.props.Min, Sec: this.props.Sec });
  }
  componentWillUnmount() {
    clearInterval(this.TimerId);
  }

  onChange = (evt) => {
    this.setState({ label: evt.target.value });
  };

  onEnter = (evt) => {
    if (evt.code === 'Enter' && evt.target.value.trim()) {
      this.setState({ label: '', Min: this.state.Min, Sec: this.state.Sec });
      this.setState(({ classNames }) => {
        return { classNames: classNames.replace('editing', '') };
      });
      const id = this.props.id;
      this.props.changeTask(this.state.label, this.state.Min, this.state.Sec, id);
    }
    if (evt.code === 'Escape') {
      this.setState(() => {
        return { classNames: '', label: this.state.label, Min: this.state.Min, Sec: this.state.Sec };
      });
    }
  };

  onEdit = () => {
    this.setState(() => {
      return { classNames: 'editing', label: this.props.Task, Min: this.state.Min, Sec: this.state.Sec };
    });
    document.addEventListener('click', (evt) => {
      if (evt.target !== document.activeElement) {
        this.setState(() => {
          return { classNames: '', label: this.props.Task, Min: this.state.Min, Sec: this.state.Sec };
        });
      }
    });
  };

  onChangeTimer = (Min, Sec) => {
    return `${Min}:${Sec}`;
  };

  onStartTimer = () => {
    if (this.TimerId) {
      clearInterval(this.TimerId);
    }
    this.TimerId = setInterval(() => {
      if (this.state.Min <= 0 && this.state.Sec <= 0) {
        clearInterval(this.TimerId);
      } else if (this.state.Sec <= 0) {
        this.setState({ Min: this.state.Min - 1, Sec: 59 });
      } else {
        this.setState({ Sec: this.state.Sec - 1 });
      }
    }, 1000);
  };

  onStopTimer = () => {
    clearInterval(this.TimerId);
  };

  render() {
    const { Task, create, onDeleted, onDone, completed } = this.props;
    const created = formatDistanceToNow(create, { addSuffix: true, includeSeconds: true });
    const timer = this.onChangeTimer(this.state.Min, this.state.Sec);
    let checked;
    let classNames = this.state.classNames;

    if (completed) {
      checked = true;
      classNames += ' completed';
    }
    if (this.props.selectedFilter === 'Active' && completed) {
      classNames += ' hidden';
    } else if (this.props.selectedFilter === 'Completed' && !completed) {
      classNames += ' hidden';
    }

    return (
      <li className={classNames}>
        <div className="view">
          <Checkbox checked={checked} onChange={onDone} id="toggle" className="toggle" />
          <label>
            <span className="title">{Task}</span>
            <span className="description">
              <Button func={this.onStartTimer} id="icon-play" className="icon icon-play" text="" />
              <Button func={this.onStopTimer} id="icon-pause" className="icon icon-pause" text="" />
              {timer}
            </span>
            <span className="description">created {created}</span>
          </label>
          <Button func={this.onEdit} id="icon-edit" className="icon icon-edit" text="" />
          <Button func={onDeleted} id="icon-destroy" className="icon icon-destroy" text="" />
        </div>
        <input
          value={this.state.label}
          onChange={this.onChange}
          onKeyUp={this.onEnter}
          type="text"
          className="edit"
        ></input>
      </li>
    );
  }
}
