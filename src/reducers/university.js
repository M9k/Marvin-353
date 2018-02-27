const initialState = {
  adminNumber: null,
};

const universityAction = {
  ADMIN_NUMBER: 'ADMIN_NUMBER',
  GET_ADMIN_NUMBER: 'GET_ADMIN_NUMBER',
};

const universityData = (state = initialState, action) => {
  // reset
  if (action.type === universityAction.GET_ADMIN_NUMBER) {
    return Object.assign({}, state, {
      adminNumber: null,
    });
  }
  if (action.type === universityAction.ADMIN_NUMBER) {
    return Object.assign({}, state, {
      adminNumber: action.adminNumber,
    });
  }
  return state;
};

export { universityData, universityAction };
