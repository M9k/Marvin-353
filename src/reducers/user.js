const initialState = {
  trylogin: false,
  logged: false,
  role: null,
};

const userAction = {
  USER_LOGGED_IN: 'USER_LOGGED_IN',
  USER_UPDATED: 'USER_UPDATED',
  USER_LOGGED_OUT: 'USER_LOGGED_OUT',
  USER_TRY_LOGIN: 'USER_TRY_LOGIN',
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

  return state;
};

export { userLogger, userAction };
