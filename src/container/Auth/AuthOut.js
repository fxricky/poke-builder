import React, { useEffect } from 'react';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/action'

const AuthOut = props => {
  useEffect(() => {
    props.logout()
  }, [])

  return <Redirect to='/auth' />
} 

export default connect(null, actions)(AuthOut);