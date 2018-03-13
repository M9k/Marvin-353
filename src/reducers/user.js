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
      return Object.assign({}, state, {
        trylogin: false,
        logged: true,
        role: action.role,
      });
    case (userAction.USER_TRY_LOGIN):
      return Object.assign({}, state, {
        trylogin: true,
        logged: false,
        role: null,
      });
    case (userAction.METAMASK_NOT_FOUND):
      return Object.assign({}, state, {
        metamask: false,
      });
    case (userAction.EDIT_ADDRESS):
      if (typeof action.address !== 'undefined') {
        return Object.assign({}, state, {
          account: action.address,
        });
      }
      return Object.assign({}, state, {
        account: '',
      });
    case (userAction.USER_LOGGED_OUT):
      return Object.assign({}, state, {
        trylogin: false,
        logged: false,
        role: null,
      });
    default:
      return state;
  }
};

export { userLogger, initialState };
