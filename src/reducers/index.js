import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import web3Reducer from '../util/web3/web3Reducer';

// main reducers
const reducers = combineReducers({
  routing: routerReducer,
  form: formReducer,
  web3: web3Reducer,
});

export default reducers;
