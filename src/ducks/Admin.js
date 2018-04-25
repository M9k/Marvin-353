import Duck from 'extensible-duck';
import { copyNPush, copyNPop } from '../util/js_helpers';

const AdminDuck = new Duck({
  namespace: 'marvin',
  store: 'Admin',
  types: ['SET_STUDENTS_LIST', 'SET_TEACHERS_LIST', 'SET_PENDING_STUDENTS_LIST', 'SET_PENDING_TEACHERS_LIST', 'APPROVE_USER', 'REMOVE_USER', 'LIST_ERRORED', 'LIST_LOADING'],
  initialState: {
    loading: false,
    errored: false,
    studentsList: [],
    teachersList: [],
    pendingStudentsList: [],
    pendingTeachersList: [],
  },
  reducer: (state, action, duck) => {
    const { types } = duck;
    switch (action.type) {
      case (types.SET_STUDENTS_LIST):
        return {
          ...state,
          studentsList: action.account,
          loading: false,
          errored: false,
        };
      case (types.SET_TEACHERS_LIST):
        return {
          ...state,
          teachersList: action.account,
          loading: false,
          errored: false,
        };
      case (types.SET_PENDING_STUDENTS_LIST):
        return {
          ...state,
          pendingStudentsList: action.account,
          loading: false,
          errored: false,
        };
      case (types.SET_PENDING_TEACHERS_LIST):
        return {
          ...state,
          pendingTeachersList: action.account,
          loading: false,
          errored: false,
        };
      case (types.APPROVE_USER):
        if (action.role === 14.0) { // is a non-approved student
          return {
            ...state,
            studentsList: copyNPush(state.studentsList, action.address),
            pendingStudentsList: copyNPop(state.pendingStudentsList, el => el === action.address),
            loading: false,
            errored: false,
          };
        } else if (action.role === 13) { // is a non-approved teacher
          return {
            ...state,
            teachersList: copyNPush(state.teachersList, action.address),
            pendingTeachersList: copyNPop(state.pendingTeachersList, el => el === action.address),
            loading: false,
            errored: false,
          };
        } break;
      case (types.REMOVE_USER):
        if (action.role === 14.0) { // is a non-approved student
          return {
            ...state,
            pendingStudentsList: copyNPop(state.pendingStudentsList, el => el === action.address),
            loading: false,
            errored: false,
          };
        } else if (action.role === 13) { // is a non-approved teacher
          return {
            ...state,
            pendingTeachersList: copyNPop(state.pendingTeachersList, el => el === action.address),
            loading: false,
            errored: false,
          };
        } break;
      case (types.LIST_LOADING):
        return {
          ...state,
          loading: true,
          errored: false,
        };
      case (types.LIST_ERRORED):
        return {
          ...state,
          loading: false,
          errored: true,
        };
      default:
        break;
    }
    return state;
  },

  creators: duck => ({
    setStudentsList: account => (
      { type: duck.types.SET_STUDENTS_LIST, account }
    ),
    setTeachersList: account => (
      { type: duck.types.SET_TEACHERS_LIST, account }
    ),
    setPendingStudentsList: account => (
      { type: duck.types.SET_PENDING_STUDENTS_LIST, account }
    ),
    setPendingTeachersList: account => (
      { type: duck.types.SET_PENDING_TEACHERS_LIST, account }
    ),
    approveUser: address => (
      { type: duck.types.APPROVE_USER, address }
    ),
    removeUser: address => (
      { type: duck.types.REMOVE_USER, address }
    ),
    listIsLoading: () => (
      { type: duck.types.LIST_LOADING }
    ),
    listHasErrored: () => (
      { type: duck.types.LIST_ERRORED }
    ),
  }),
});
export const { creators, selectors } = AdminDuck;
export default AdminDuck.reducer;
