import React, {useState} from 'react';
import css from './Layout.css'
import Toolbar from '../Toolbar/Toolbar'
import SideDrawer from '../SideDrawer/SideDrawer'
import { Link } from 'react-router-dom';

const Layout = props => {
  const [showSideDrawer, setsideDrawer] = useState(false);

  const sideDrawerShowHandler = () => {
    setsideDrawer(!showSideDrawer)
  }

  return(
    <div className={css.Main}>
      <Toolbar trigger={sideDrawerShowHandler}/>
      <SideDrawer show={showSideDrawer} trigger={sideDrawerShowHandler}/>
      <main className={css.Content}>
        {props.children}
      </main>
      <footer className={css.Footer}><p>Build by Ricky <a href='https://github.com/fxricky/poke-builder'><i className="fa fa-github" aria-hidden="true"></i></a></p></footer>
    </div>
  )
};

export default Layout;