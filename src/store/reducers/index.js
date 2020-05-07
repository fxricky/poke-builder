import {combineReducers} from 'redux'
import reducer from './reducer'
import authreducer from './auth'

const rootReducer =
  combineReducers({
    pokereducer: reducer,
    authreducer: authreducer
  })

export default rootReducer;