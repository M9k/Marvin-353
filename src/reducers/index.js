import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { userLogger } from './user';

// main reducers
const reducers = combineReducers({
  routing: routerReducer,
  form: formReducer,
  user: userLogger,
});

export default reducers;
