import React , {PureComponent} from 'react';
import css from './Auth.css';
import Input from '../../component/Layout/UI/Input/Input';

import {connect} from 'react-redux';
import * as actions from '../../store/actions/action'

class Auth extends PureComponent {
  constructor(props){
    super(props)
    this.state ={
      form:{
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
      },
      sending: false,
      signup: false
    }
  }

  componentDidMount(){}

  loginHandler = (event) => {
    event.preventDefault();
    this.props.authIn({
      email: this.state.form.email.value,
      password: this.state.form.password.value
    })
  }

  signUpHandler = (event) => {
    event.preventDefault();
    this.props.signIn({
      email: this.state.form.email.value,
      password: this.state.form.password.value
    })
  }

  logoutHandler = (event) => {
    // event.preventDefault();
    // this.props.logout();

    this.props.history.push({
      pathname: 'authout'
    })
  }

  changeFormHandler = (event) => {
    this.setState(prev => ({signup: !prev.signup}))
  }

  inputChangedHandler = (event, id) => {
    const{value} = event.target

    this.setState(prev => ({
      form: {
        ...prev.form,
        [id] :{
          ...prev.form[id],
          value: value
        }
      }
    }))
  }

  render(){
    let formElementArray = [];
    for (let key in this.state.form){
      formElementArray.push({
        id: key,
        config: this.state.form[key]
      })
    }

    let loginElement = (
      <div>
        <h3>You already logged in.</h3>
        <div className={css.Logout} onClick={this.logoutHandler}>Log out</div>
      </div>
    )

    if(!this.props.loggedin){
      loginElement = (
        <>
        <h4>{this.state.signup ? `Sign Up`: `Login` }</h4>
        <form>
          {formElementArray.map(obj => (
            <Input 
              key={obj.id} 
              elementType={obj.config.elementType} 
              elementConfig={obj.config.elementConfig}
              value={obj.config.value}
              changed={(event) => this.inputChangedHandler(event, obj.id)}
            />
          ))}
          {this.props.error && <div className={css.Error}>{this.props.error}</div>}
          {this.state.signup ?
            <button disabled={this.state.sending} onClick={this.signUpHandler}>Sign Up</button> :
            <button disabled={this.state.sending} onClick={this.loginHandler}>Login</button>}
        </form>
        {this.state.signup ?
          <div className={css.AuthSignUpTinyBar}>Already have an account? <div onClick={this.changeFormHandler}>Login</div> here.</div> :
          <div className={css.AuthSignUpTinyBar}>Don't have an account? <div onClick={this.changeFormHandler}>SignUp</div> here.</div> }
        </>
      )
    }

    return(
      <div className={css.Auth}>
        {loginElement}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    error: state.authreducer.error,
    loggedin: state.authreducer.loggedin
  }
}

export default connect(mapStateToProps, actions)(Auth);