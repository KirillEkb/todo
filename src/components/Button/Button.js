import React from "react";
import './Button.css';

const Button = ({func,id,selectedFilter = '', className = '', text=''}) => {
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
export default Button;