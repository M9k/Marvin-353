import { universityAction } from '../actions/actions';

const initialState = {
  adminNumber: 0,
  adminAccount: null,
};

const universityData = (state = initialState, action) => {
  switch (action.type) {
    case (universityAction.SET_ADMIN_NUMBER):
      return {
        ...state,
        adminNumber: action.adminNumber,
      };
    case (universityAction.SET_ADMINS_LIST):
      return {
        ...state,
        adminAccount: action.account,
      };
    default:
      return state;
  }
};

export { universityData, initialState };
