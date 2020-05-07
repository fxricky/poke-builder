import React, {Component} from 'react';
import css from './Layout.css'
import Toolbar from '../Toolbar/Toolbar'
import SideDrawer from '../SideDrawer/SideDrawer'

class Layout extends Component {
  constructor(props){
    super(props);
    this.state = {
      showSideDrawer : false
    }
  }

  sideDrawerShowHandler = () => {
    this.setState(prev => ({showSideDrawer: !prev.showSideDrawer}))
  }

  render(){
    return(
      <>
        <Toolbar trigger={this.sideDrawerShowHandler}/>
        <SideDrawer show={this.state.showSideDrawer} trigger={this.sideDrawerShowHandler}/>
        <main className={css.Content}>
          {this.props.children}
        </main>
      </>
    )
  }
};

export default Layout;