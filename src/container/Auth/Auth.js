import React , {useState, useReducer} from 'react';
import css from './Auth.css';
import Input from '../../component/Layout/UI/Input/Input';

import {connect} from 'react-redux';
import * as actions from '../../store/actions/action'

const Auth = props => {
  const [form, setForm] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'youremail@provider.com'
      },
      value: ''
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password'
      },
      value: ''
    }
  });

  const [sending, setSending] = useState(false);

  const [signup, setSignup] = useState(false);

  const loginHandler = (event) => {
    event.preventDefault();
    props.authIn({
      email: form.email.value,
      password: form.password.value
    })
  }

  const signUpHandler = (event) => {
    event.preventDefault();
    props.signIn({
      email: form.email.value,
      password: form.password.value
    })
  }

  const logoutHandler = () => {
    props.history.push({
      pathname: 'authout'
    })
  }

  const changeFormHandler = () => {
    setSignup(!signup);
  }

  const inputChangedHandler = (event, id) => {
    const{value} = event.target

    setForm({
      ...form,
      [id] :{
        ...form[id],
        value: value
      }
    })
  }

    let formElementArray = [];
    for (let key in form){
      formElementArray.push({
        id: key,
        config: form[key]
      })
    }

    let loginElement = (
      <div>
        <h3>You already logged in.</h3>
        <div className={css.Logout} onClick={logoutHandler}>Log out</div>
      </div>
    )

    if(!props.loggedin){
      loginElement = (
        <>
        <h4>{signup ? `Sign Up`: `Login` }</h4>
        <form>
          {formElementArray.map(obj => (
            <Input 
              key={obj.id} 
              elementType={obj.config.elementType} 
              elementConfig={obj.config.elementConfig}
              value={obj.config.value}
              changed={(event) => inputChangedHandler(event, obj.id)}
            />
          ))}
          {props.error && <div className={css.Error}>{props.error}</div>}
          {signup ?
            <button disabled={sending} onClick={signUpHandler}>Sign Up</button> :
            <button disabled={sending} onClick={loginHandler}>Login</button>}
        </form>
        {signup ?
          <div className={css.AuthSignUpTinyBar}>Already have an account? <div onClick={changeFormHandler}>Login</div> here.</div> :
          <div className={css.AuthSignUpTinyBar}>Don't have an account? <div onClick={changeFormHandler}>SignUp</div> here.</div> }
        </>
      )
    }

    return(
      <div className={css.AuthCont}>
        <div className={css.Auth}>
          {loginElement}
        </div>
      </div>
    )
}

const mapStateToProps = state => {
  return{
    error: state.authreducer.error,
    loggedin: state.authreducer.loggedin
  }
}

export default connect(mapStateToProps, actions)(Auth);