const initialState = {
  metamask: false,
  account: null,
  trylogin: false,
  logged: false,
  role: null,
};

const userAction = {
  USER_LOGGED_IN: 'USER_LOGGED_IN',
  USER_UPDATED: 'USER_UPDATED',
  USER_LOGGED_OUT: 'USER_LOGGED_OUT',
  USER_TRY_LOGIN: 'USER_TRY_LOGIN',
  METAMASK: 'METAMASK',
  EDIT_ADDRESS: 'EDIT_ADDRESS',
};

const userLogger = (state = initialState, action) => {
  if (action.type === userAction.USER_LOGGED_IN || action.type === userAction.USER_UPDATED) {
    return Object.assign({}, state, {
      trylogin: false,
      logged: true,
      role: action.role,
    });
  }

  if (action.type === userAction.USER_LOGGED_OUT) {
    return Object.assign({}, state, {
      trylogin: false,
      logged: false,
      role: null,
    });
  }

  if (action.type === userAction.USER_TRY_LOGIN) {
    return Object.assign({}, state, {
      trylogin: true,
      logged: false,
      role: null,
    });
  }
  if (action.type === userAction.METAMASK) {
    return Object.assign({}, state, {
      metamask: true,
    });
  }
  if (action.type === userAction.EDIT_ADDRESS) {
    return Object.assign({}, state, {
      address: action.address,
    });
  }

  return state;
};

export { userLogger, userAction };
