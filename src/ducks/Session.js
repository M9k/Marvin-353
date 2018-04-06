const actionType = action => (`marvin/session/${action}`);

const SET_ROLE = actionType("SET_ROLE");
const SET_DATA = actionType("SET_DATA");
const CLEAN_DATA = actionType("CLEAN_DATA");
const ROLE_LOADING = actionType("ROLE_LOADING");
const DATA_LOADING = actionType("DATA_LOADING");

export const initialDataState = {
  errored: false,
  loading: false,
  name: null,
  surname: null,
  course: null
};
const initialState = {
  errored: false,
  loading: false,
  role: null,
  data: initialDataState
};

export const isLogged = (state) => (
  state.user.role !== null
);

export default function reducer(state = initialState, action){
  switch(action.type){
    case(SET_ROLE):
      return {
        ...state,
        role: action.role,
        errored: action.errored
      };
    case(SET_DATA):
      return {
        ...state,
        data: action.data,
      };
    case(CLEAN_DATA):
      return initialState;
    case(ROLE_LOADING):
      return {
        ...state,
        loading: true,
        errored: false,
      };
    case(DATA_LOADING):
      return {
        ...state,
        data: Object.assign({}, initialDataState, { loading: true, errored: false })
      };
    default:
      return state;
  }
}

export const setRole = (role, errored = false) => (
  { type: SET_ROLE, role, errored }
);
export const setData = (data) => (
  { type: SET_DATA, data }
);
export const cleanData = () => (
  { type: CLEAN_DATA }
);
export const roleLoading = () => (
  { type: ROLE_LOADING }
);
export const dataLoading = () => (
  { type: DATA_LOADING }
);
