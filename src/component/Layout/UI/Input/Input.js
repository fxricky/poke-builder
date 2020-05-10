import React from 'react';
import css from './Input.css';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

const input = (props) => {
  let inputElement = null;

  switch(props.elementType){
    case 'input':
      inputElement = <TextField  onChange={props.changed} className={css.Input} {...props.elementConfig} value={props.value}/>;
      break;
    case 'textarea':
      inputElement = <TextField onChange={props.changed} className={css.Input} {...props.elementConfig} value={props.value}/>;
      break;
    case 'select':
      inputElement = 
        <Select 
          variant='outlined'
          labelId={props.cKey}
          value={props.value}
          onChange={props.changed}>
          {props.elementConfig.options.map(obj => 
            <MenuItem key={obj.value} value={obj.value}>{obj.displayValue}</MenuItem>
          )}
        </Select>;
      break;
    default: break;
  }

  return(
    <div className={css.InputCont}>
      <InputLabel id={props.key}>{props.label}</InputLabel>
      {inputElement}
    </div>
)};

export default input;