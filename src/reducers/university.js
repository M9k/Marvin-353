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

    /* Trigger for sagas */
    case (universityAction.GET_ADMIN_NUMBER):
    case (universityAction.ADD_NEW_ADMIN):
    case (universityAction.REMOVE_ADMIN):
    case (universityAction.GET_ALL_ADMINS):
    default:
      return state;
  }
};

export { universityData, initialState };
