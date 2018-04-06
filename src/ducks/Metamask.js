const actionTypes = action => (`marvin/Metamask/${action}`);

const METAMASK_LOGIN = actionTypes('LOGIN');
const METAMASK_LOGOUT = actionTypes('LOGOUT');
const METAMASK_ADDRESS = actionTypes('ADDRESS');
const METAMASK_NOT_FOUND = actionTypes('NOT_FOUND');

const initialState = {
  present: true,
  account: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case (METAMASK_LOGIN):
      return {
        ...state,
        present: true,
      };
    case (METAMASK_LOGOUT):
      return {
        ...state,
        present: true,
        account: '',
      };
    case (METAMASK_ADDRESS):
      if (typeof action.address !== 'undefined') {
        return {
          ...state,
          account: action.address,
        };
      }
      return state;

    case (METAMASK_NOT_FOUND):
      return Object.assign({}, initialState, { present: false });
    default:
      return state;
  }
}

export const login = () => (
  { type: METAMASK_LOGIN }
);
export const logout = () => (
  { type: METAMASK_LOGOUT }
);
export const setAddress = address => (
  { type: METAMASK_ADDRESS, address }
);
export const notFound = () => (
  { type: METAMASK_NOT_FOUND }
);

