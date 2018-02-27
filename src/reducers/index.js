import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { userLogger } from './user';
import { universityData } from './university';


const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['routing', 'form'],
};


// main reducers
const reducers = combineReducers({
  routing: routerReducer,
  form: formReducer,
  user: userLogger,
  university: universityData,
});

const persistentReducer = persistReducer(persistConfig, reducers);

export default persistentReducer;
