import React, {useState} from 'react';
import css from './Layout.css'
import Toolbar from '../Toolbar/Toolbar'
import SideDrawer from '../SideDrawer/SideDrawer'

const Layout = props => {
  const [showSideDrawer, setsideDrawer] = useState(false);

  const sideDrawerShowHandler = () => {
    setsideDrawer(!showSideDrawer)
  }

  return(
    <>
      <Toolbar trigger={sideDrawerShowHandler}/>
      <SideDrawer show={showSideDrawer} trigger={sideDrawerShowHandler}/>
      <main className={css.Content}>
        {props.children}
      </main>
    </>
  )
};

export default Layout;