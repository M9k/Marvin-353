import Duck from 'extensible-duck';
import { updateObjInArr, copyNPush } from '../util/js_helpers';

const CourseExamsDuck = new Duck({
  namespace: 'marvin',
  store: 'CourseExams',
  types: ['SET_COURSE', 'SET_LIST', 'SET_PROFESSOR', 'PUSH_NEW_EXAM', 'LIST_LOADING', 'LIST_ERRORED'],
  initialState: {},
  reducer: (state, action, duck) => {
    const { types } = duck;
    switch (action.type) {
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
      case (types.SET_LIST):
        return {
          ...state,
          loading: false,
          errored: false,
          list: action.list,
        };
      case (types.SET_PROFESSOR):
        return {
          ...state,
          loading: false,
          errored: false,
          list: updateObjInArr(
            state.list,
            obj => obj.address === action.examAddress,
            action.teacher,
          ),
        };
      case (types.PUSH_NEW_EXAM):
        return {
          ...state,
          loading: false,
          errored: false,
          list: copyNPush(state.list, action.exam),
        };
      default:
        return state;
    }
  },
  selectors: {

  },
  creators: ({ types }) => ({
    setList: list => (
      { type: types.SET_LIST, list }
    ),
    setProfessor: (examAddress, teacher) => (
      { type: types.SET_PROFESSOR, examAddress, teacher }
    ),
    listIsLoading: () => (
      { type: types.LIST_LOADING }
    ),
    listHasErrored: () => (
      { type: types.LIST_ERRORED }
    ),
    pushNewExam: exam => (
      { type: types.PUSH_NEW_EXAM, exam }
    ),
  }),
});
export const { creators, selectors, initialState } = CourseExamsDuck;
export default CourseExamsDuck.reducer;
