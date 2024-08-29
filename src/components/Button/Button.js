import React from "react";
import './Button.css';
import PropTypes from 'prop-types';

const Button = ({func, id, selectedFilter, className, text}) => {
if(id === selectedFilter) {
    className += 'selected'
}
    return(
        <button
         onClick = {func}
         key = {id}
         className = {className}
         >
        {text}
        </button>
    );
};

Button.defaultProps = {
    func: () => {},
    selectedFilter : '',
    className : '',
    text : ''        
}
Button.propTypes = {
    id: PropTypes.string.isRequired,
    func: PropTypes.func,
    selectedFilter: PropTypes.string,
    className: PropTypes.string
}


export default Button;