import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import AdminEmployer from '../ducks/AdminEmployer';
import Session from '../ducks/Session';
import Metamask from '../ducks/Metamask';


const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['routing', 'form', 'user'],
};
const userPersistConfig = {
  key: 'user',
  storage,
  blacklist: ['metamask'],
};


// main reducers
const reducers = combineReducers({
  routing: routerReducer,
  form: formReducer,
  metamask: Metamask,
  user: Session,
  university: AdminEmployer,
});

const persistentReducer = persistReducer(persistConfig, reducers);

export default persistentReducer;
