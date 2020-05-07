import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/action'

class AuthOut extends Component{

  componentDidMount(){
    this.props.logout();
  }

  render(){
    return <Redirect to='/auth' />
  }
} 

export default connect(null, actions)(AuthOut);