import React, {Component} from "react";
import './Checkbox.css';

class Checkbox extends Component {

    render(){
        const {checked} = this.props
        return (
        <input  
        key = {this.props.id}
        checked = {checked}
        className={this.props.className}
        onChange={this.props.onChange}
        type="checkbox"/>
    )}
};

export default Checkbox;