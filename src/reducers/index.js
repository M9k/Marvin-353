import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

// main reducers
const reducers = combineReducers({
  routing: routerReducer,
  form: formReducer,
});

export default reducers;
