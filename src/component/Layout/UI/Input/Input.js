import React from 'react';
import css from './Input.css'

const input = (props) => {
  let inputElement = null;

  switch(props.elementType){
    case 'input':
      inputElement = <input onChange={props.changed} className={css.Input} {...props.elementConfig} value={props.value}/>;
      break;
    case 'textarea':
      inputElement = <textarea onChange={props.changed} className={css.Input} {...props.elementConfig} value={props.value}/>;
      break;
    case 'select':
      inputElement = 
        <select 
          className={css.Input}
          value={props.value}
          onChange={props.changed}>
          {props.elementConfig.options.map(obj => 
            <option key={obj.value} value={obj.value}>{obj.displayValue}</option>
          )}
        </select>;
      break;
    default: break;
  }

  return(
    <div>
      <label className={css.Label}>{props.label}</label>
      {inputElement}
    </div>
)};

export default input;