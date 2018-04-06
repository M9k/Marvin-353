const actionType = action => ( `marvin/AdminEmployer/${action}`);
const SET_ADMIN_NUMBER = actionType('SET_ADMIN_NUMBER');
const SET_ADMINS_LIST = actionType('SET_ADMINS_LIST');
const POP_ADMIN = actionType('POP_ADMIN');
const PUSH_ADMIN = actionType('PUSH_ADMIN');
const LIST_ERRORED = actionType('LIST_ERRORED');
const LIST_LOADING = actionType('LIST_LOADING');

export const actions = {
  SET_ADMINS_LIST,
  POP_ADMIN,
  PUSH_ADMIN,
  LIST_ERRORED,
  LIST_LOADING,
};

const initialState = {
  loading: false,
  errored: false,
  adminAccount: null,
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case (SET_ADMINS_LIST):
      return {
        ...state,
        adminAccount: action.account,
        loading: false,
        errored: false,
      };
    case(POP_ADMIN):
      let accounts = Object.assign([], state.adminAccount);
      let idx = accounts.findIndex(el => el === action.address);
      if(idx > -1) accounts.splice(idx, 1);
      return {
        ...state,
        adminAccount: accounts,
        adminNumber: accounts.length,
        loading: false,
      };
    case(PUSH_ADMIN):
      let accountss = Object.assign([], state.adminAccount);
      accountss.push(action.address);
      return {
        ...state,
        adminAccount: accountss,
        adminNumber: accountss.length,
        loading: false,
      };
    case(LIST_LOADING):
      return {
        ...state,
        loading: true,
        errored: false
      };
    case(LIST_ERRORED):
      return {
        ...state,
        loading: false,
        errored: true
      };
    default:
      return state;
  }
}
export const setAdminsList = account => (
  { type: SET_ADMINS_LIST, account }
);
export const popAdmin = address => (
  { type: POP_ADMIN, address }
);
export const pushAdmin = address => (
  { type: PUSH_ADMIN, address }
);
export const listIsLoading = () => (
  { type: LIST_LOADING }
);
export const listHasErrored = () => (
  { type: LIST_ERRORED }
);
