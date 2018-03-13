import { universityAction } from '../actions/actions';

const initialState = {
  adminNumber: 0,
  adminAccount: null,
};

const universityData = (state = initialState, action) => {
  // reset
  switch (action.type) {
    case universityAction.GET_ADMIN_NUMBER:
      return Object.assign({}, state, {});
    case universityAction.RETURN_ADMIN_NUMBER:
      return Object.assign({}, state, {
        adminNumber: action.adminNumber,
      });
    case universityAction.ADD_NEW_ADMIN:
      return Object.assign({}, state, {});
    case universityAction.GET_ALL_ADMINS:
      return Object.assign({}, state, {});
    case universityAction.RETURN_ALL_ADMINS:
      return Object.assign({}, state, {
        adminAccount: action.account,
      });
    default:
      return state;
  }// switch
};

export { universityData, initialState };
