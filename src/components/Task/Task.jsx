//одна задача
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
    description: PropTypes.string.isRequired,
    create: PropTypes.object.isRequired,
    onDeleted: PropTypes.func,
    onDone: PropTypes.func,
    completed: PropTypes.bool,
  };
  state = {
    classNames: '',
    label: '',
  };

  onChange = (evt) => {
    this.setState({ label: evt.target.value });
  };

  onEnter = (evt) => {
    if (evt.code === 'Enter' && evt.target.value.trim()) {
      this.setState({ label: '' });
      this.setState(({ classNames }) => {
        return { classNames: classNames.replace('editing', '') };
      });
      const id = this.props.id;
      this.props.changeTask(this.state.label, id);
    }
  };

  onEdit = () => {
    this.setState(() => {
      return { classNames: 'editing' };
    });
    this.setState({ label: this.props.description });
  };

  render() {
    const { description, create, onDeleted, onDone, completed } = this.props;
    const created = formatDistanceToNow(create, { addSuffix: true, includeSeconds: true });

    let checked;
    let classNames = this.state.classNames;

    if (completed) {
      checked = true;
      classNames += ' completed';
    }

    return (
      <li className={classNames}>
        <div className="view">
          <Checkbox checked={checked} onChange={onDone} id="toggle" className="toggle" />
          <label>
            <span className="description">{description}</span>
            <span className="created">created {created}</span>
          </label>
          <Button func={this.onEdit} id="icon-edit" className="icon icon-edit" text="" />
          <Button func={onDeleted} id="icon-destroy" className="icon icon-destroy" text="" />
        </div>
        <input
          value={this.state.label}
          onChange={this.onChange}
          onKeyUp={this.onEnter}
          autoFocus
          type="text"
          className="edit"
        ></input>
      </li>
    );
  }
}
