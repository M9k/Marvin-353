import { userAction } from '../actions/actions';

const initialState = {
  metamask: true,
  account: '',
  trylogin: false,
  logged: false,
  role: null,
};

const userLogger = (state = initialState, action) => {
  switch (action.type) {
    case (userAction.USER_LOGGED_IN):
    case (userAction.USER_UPDATED):
      return {
        ...state,
        trylogin: false,
        logged: true,
        role: action.role,
      };
    case (userAction.USER_TRY_LOGIN):
      return {
        ...state,
        trylogin: true,
        logged: false,
        role: null,
      };
    case (userAction.METAMASK_NOT_FOUND):
      return {
        ...state,
        metamask: false,
      };
    case (userAction.EDIT_ADDRESS):
      if (typeof action.address !== 'undefined') {
        return {
          ...state,
          account: action.address,
        };
      }
      return {
        ...state,
        account: '',
      };
    case (userAction.USER_LOGGED_OUT):
      return {
        ...state,
        trylogin: false,
        logged: false,
        role: null,
      };
    default:
      return state;
  }
};

export { userLogger, initialState };
