import * as type from './type'
import * as firebase from 'firebase'

export const authStart = () => {
  return{type: type.AUTH_START}
}

export const authSuccess = (data) => {
  localStorage.setItem('auth', +data);
  return{type: type.AUTH_SUCCESS, payload: data}
}

export const authFailed = (error) => {
  return{type: type.AUTH_FAILED, payload: error}
}

export const authIn = (obj) => dispatch => {
  const{email, password} = obj;
  firebase.auth().signInWithEmailAndPassword(email, password).then(resp => {
    dispatch(authSuccess(true));
  })
  .catch(err => dispatch(authFailed(err.message)))
}

export const signIn = (obj) => dispatch => {
  const{email, password} = obj;
  firebase.auth().createUserWithEmailAndPassword(email, password).then(resp => {
    dispatch(authSuccess(true));
  })
  .catch(err => dispatch(authFailed(err.message)))
}

export const logout = () => dispatch => {
  firebase.auth().signOut().then(() => {
    localStorage.clear();
    dispatch({type: type.AUTH_OUT});
  })
}

export const checkisLoggedin = () => dispatch => {
  !!localStorage.getItem('auth') ? dispatch(authSuccess(true)) : dispatch({type: type.AUTH_OUT})
}