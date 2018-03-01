const initialState = {
  adminNumber: 0,
};

const universityAction = {
  ADMIN_NUMBER: 'ADMIN_NUMBER',
  GET_ADMIN_NUMBER: 'GET_ADMIN_NUMBER',
  ADD_NEW_ADMIN: 'ADD_NEW_ADMIN',
};

const universityData = (state = initialState, action) => {
  // reset
  if (action.type === universityAction.GET_ADMIN_NUMBER) {
    return Object.assign({}, state, {
      adminNumber: 0,
    });
  }
  if (action.type === universityAction.ADMIN_NUMBER) {
    return Object.assign({}, state, {
      adminNumber: action.adminNumber,
    });
  }
  if (action.type === universityAction.ADD_NEW_ADMIN) {
    return Object.assign({}, state, {
      adminNumber: action.adminNumber,
    });
  }
  return state;
};

export { universityData, universityAction };
