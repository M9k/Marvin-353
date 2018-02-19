const initialState = {
  data: null,
};

const user = (state = initialState, action) => {
  if (action.type === 'USER_LOGGED_IN' || action.type === 'USER_UPDATED') {
    return Object.assign({}, state, {
      data: action.payload,
    });
  }

  if (action.type === 'USER_LOGGED_OUT') {
    return Object.assign({}, state, {
      data: null,
    });
  }

  return state;
};

export default user;
