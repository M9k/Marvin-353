const SET_ADMIN_NUMBER = 'marvin/universityAdmin/SET_ADMIN_NUMBER';
const SET_ADMINS_LIST = 'marvin/universityAdmin/SET_ADMINS_LIST';

const initialState = {
  adminNumber: 0,
  adminAccount: null,
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case (SET_ADMIN_NUMBER):
      return {
        ...state,
        adminNumber: action.adminNumber,
      };
    case (SET_ADMINS_LIST):
      return {
        ...state,
        adminAccount: action.account,
      };
    default:
      return state;
  }
}

export const setAdminNumber = adminNumber => (
  { type: SET_ADMIN_NUMBER, adminNumber }
);
export const setAdminsList = account => (
  { type: SET_ADMINS_LIST, account }
);
