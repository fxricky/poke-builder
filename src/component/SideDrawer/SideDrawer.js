import React from 'react';
import css from './SideDrawer.css'
import {NavItems} from '../Toolbar/Toolbar'
import Backdrop from '../Layout/Backdrop'

const sideDrawer = (props) => {
  let attachClass = [css.SideDrawer, css.Close];
  if(props.show){
    attachClass = [css.SideDrawer, css.Open]
  }

  return(
    <>
      <Backdrop show={props.show} clicked={props.trigger}/>
      <div onClick={props.trigger} className={attachClass.join(' ')}>
        <NavItems />
      </div>
    </>
  );
};

export default sideDrawer;