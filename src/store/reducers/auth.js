import * as actionTypes from '../actions/type'

const INIT_STATE = {
  token: null,
  userid: null,
  error: null,
  loggedin: false
}

const reducer = (state = INIT_STATE, action) => {
  const payload = action.payload;
  switch(action.type){
    case actionTypes.AUTH_FAILED:
      return{...state, error: payload}
    case actionTypes.AUTH_SUCCESS:
      return{...state, loggedin: payload}
    case actionTypes.AUTH_OUT:
      return{...state, loggedin: false}
    default:
      return state;
  }
}

export default reducer;