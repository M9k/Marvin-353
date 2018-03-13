import { userAction } from '../actions/actions';

const initialState = {
  metamask: true,
  account: '',
  trylogin: false,
  logged: false,
  role: null,
};

const userLogger = (state = initialState, action) => {
  if (action.type === userAction.USER_LOGGED_IN || action.type === userAction.USER_UPDATED) {
    return Object.assign({}, state, {
      trylogin: false,
      logged: true,
      role: action.role,
    });
  }
  if (action.type === userAction.USER_TRY_LOGIN) {
    return Object.assign({}, state, {
      trylogin: true,
      logged: false,
      role: null,
    });
  }
  if (action.type === userAction.METAMASK_NOT_FOUND) {
    return Object.assign({}, state, {
      metamask: false,
    });
  }
  if (action.type === userAction.EDIT_ADDRESS) {
    if (typeof action.address !== 'undefined') {
      return Object.assign({}, state, {
        account: action.address,
      });
    }
    return Object.assign({}, state, {
      account: '',
    });
  }
  if (action.type === userAction.USER_LOGGED_OUT) {
    return Object.assign({}, state, {
      trylogin: false,
      logged: false,
      role: null,
    });
  }

  return state;
};

export { userLogger, initialState };
