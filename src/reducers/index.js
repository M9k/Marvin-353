import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { userLogger } from './user';
import { numberOfAdmin } from './university';


const persistConfig = {
  key: 'root',
  storage,
};

const persistentUserLogger = persistReducer(persistConfig, userLogger);
const persistentUniversity = persistReducer(persistConfig, numberOfAdmin);

// main reducers
const reducers = combineReducers({
  routing: routerReducer,
  form: formReducer,
  user: persistentUserLogger,
  university: persistentUniversity,
});


export default reducers;
