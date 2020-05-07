import * as actionTypes from '../actions/type'

const INIT_STATE = {
  ingredients: [],
  selecteding: {},
  totalcalories: 0,
  recommending: []
}

const reducer = (state = INIT_STATE, action) => {
  let payload = action.payload;

  switch(action.type){
    case actionTypes.GET_INGREDIENTS:
      return{...state, ingredients: payload}
    case actionTypes.ADD_SELECTEDING:
      return{...state, ...payload }
    case actionTypes.REM_SELECTEDING:
      return{...state, ...payload }
    case actionTypes.RESET_SELECTEDING:
      return{...state, selecteding: {} , totalcalories: 0}
    case actionTypes.GET_RECOMMENDING:
      return{...state, recommending: payload}
    default:
      return state;
  }
}

export default reducer;