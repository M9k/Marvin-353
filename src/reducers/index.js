import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import web3Reducer from './web3Reducer';
import userReducer from './user';

// main reducers
const reducers = combineReducers({
  routing: routerReducer,
  form: formReducer,
  web3: web3Reducer,
  user: userReducer,
});

export default reducers;
