import React from 'react';
import './styles/Selection.css';

const Selection = (props) => {
  return (
      <button 
        id={props.id}
        className="selection"
        onClick= {props.onClick}
        style=
        {
          {
            backgroundColor: props.color,
            border: "solid black"
          }
        }
      >
        <div className="innerSelection">
          {props.selection}
        </div>
      </button>
    );
};

export default Selection