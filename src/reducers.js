import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import AdminEmployer from './ducks/AdminEmployer';
import Session from './ducks/Session';
import Metamask from './ducks/Metamask';
import ManageYears from './ducks/ManageYears';
import Booking from './ducks/Booking';
import Evaluator from './ducks/Evaluator';
import TeacherExam from './ducks/TeacherExam';
import AdminDuck from './ducks/Admin';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['routing', 'form'],
};


// main reducers
const reducers = combineReducers({
  routing: routerReducer,
  form: formReducer,
  metamask: Metamask,
  user: Session,
  university: AdminEmployer,
  manageYears: ManageYears,
  signup: Booking,
  selectedExam: Evaluator,
  teacherData: TeacherExam,
  accounts: AdminDuck,
});

const persistentReducer = persistReducer(persistConfig, reducers);

export default persistentReducer;
