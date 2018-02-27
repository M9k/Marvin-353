const initialState = {
  adminNumber: null,
};

const universityAction = {
  ADMIN_NUMBER: 'ADMIN_NUMBER',
};

const numberOfAdmin = (state = initialState, action) =>{
  return Object.assign({}, state, {
    adminNumber: action.adminNumber,
  });
};

export { numberOfAdmin, universityAction };
