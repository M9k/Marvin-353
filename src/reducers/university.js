import { universityAction } from '../actions/actions';

const initialState = {
  adminNumber: 0,
  adminAccount: null,
};

const universityData = (state = initialState, action) => {
  switch (action.type) {
    case (universityAction.GET_ADMIN_NUMBER):
      return state;
    case (action.type === universityAction.SET_ADMIN_NUMBER):
      return Object.assign({}, state, {
        adminNumber: action.adminNumber,
      });
    case (action.type === universityAction.ADD_NEW_ADMIN):
      return state;
    case (action.type === universityAction.GET_ALL_ADMINS):
      return state;
    case (action.type === universityAction.SET_ADMINS_LIST):
      return Object.assign({}, state, {
        adminAccount: action.account,
      });
    default:
      return state;
  }
};

export { universityData, initialState };
