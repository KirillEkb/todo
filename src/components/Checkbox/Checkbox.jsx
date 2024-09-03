import { Component } from 'react';
import PropTypes from 'prop-types';
import './Checkbox.css';

export default class Checkbox extends Component {
  static defaultProps = {
    checked: false,
  };
  static propTypes = {
    checked: PropTypes.bool,
  };
  render() {
    const { checked } = this.props;
    return <input checked={checked} className={this.props.className} onChange={this.props.onChange} type="checkbox" />;
  }
}
