import React from 'react';
import css from './Toolbar.css';
import {withRouter, NavLink} from 'react-router-dom';

export const NavItem = (props) => (
  <li className={css.NavItem}>
    <NavLink exact activeClassName={css.active} to={props.link}>{props.children}</NavLink>
  </li>
)

export const NavItems = (props) => (
  <ul className={css.NavItems}>
    <NavItem link='/'>Poke Builder</NavItem>
    <NavItem link='/recommending' >Recommending</NavItem>
    <NavItem link='/auth' >Login</NavItem>
  </ul>
)

const toolbar = (props) => {
  return (
  <header className={css.Toolbar}>
    <div 
      className={css.MobileOnly} 
      onClick={props.trigger}>
        <i className="fa fa-bars" aria-hidden="true"/>
    </div>
    <div className={css.DesktopOnly}>MENU</div>
    <nav className={css.DesktopOnly}>
      <NavItems/>
    </nav>
  </header>
) }

export default withRouter(toolbar);