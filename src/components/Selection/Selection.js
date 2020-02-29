import React from 'react';
import './Selection.css';

const Selection = (props) => {
  return (
      <button 
        id={props.id}
        className="selection"
        onClick= {null}
        style=
        {
          {
            backgroundColor: props.color,
            border: "solid black"
          }
        }
      >
        {props.selection}
      </button>
    );
};

export default Selection