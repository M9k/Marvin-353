import { universityAction } from '../actions/actions';

const initialState = {
  adminNumber: 0,
  adminAccount: null,
};

const universityData = (state = initialState, action) => {
  // reset
  if (action.type === universityAction.GET_ADMIN_NUMBER) {
    return Object.assign({}, state, {});
  }
  if (action.type === universityAction.RETURN_ADMIN_NUMBER) {
    return Object.assign({}, state, {
      adminNumber: action.adminNumber,
    });
  }
  if (action.type === universityAction.ADD_NEW_ADMIN) {
    return Object.assign({}, state, {});
  }
  if (action.type === universityAction.GET_ALL_ADMINS) {
    return Object.assign({}, state, {});
  }
  if (action.type === universityAction.RETURN_ALL_ADMINS) {
    return Object.assign({}, state, {
      adminAccount: action.account,
    });
  }
  return state;
};

export { universityData, initialState };
