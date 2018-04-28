import Duck from 'extensible-duck';
import { copyNPush } from '../util/js_helpers';
// , copyNPop, ORDERING

const CourseDuck = new Duck({
  namespace: 'marvin',
  store: 'Course',
  types: ['PUSH_NEW_COURSE', 'SET_COURSES_LIST', 'LIST_LOADING', 'LIST_ERRORED'],
  initialState: {
    loading: false,
    errored: false,
    coursesList: [],
  },

  reducer: (state, action, duck) => {
    const { types } = duck;
    // const { initialState } = duck;
    switch (action.type) {
      case (types.PUSH_NEW_COURSE):
        return {
          ...state,
          coursesList: copyNPush(state.coursesList, action.address),
          loading: false,
        };
      case (types.SET_COURSES_LIST):
        return {
          ...state,
          coursesList: action.account,
          loading: false,
          errored: false,
        };
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
        return state;
    }
  },

  creators: duck => ({
    setCoursesList: account => (
      { type: duck.types.SET_COURSES_LIST, account }
    ),
    pushNewCourse: address => (
      { type: duck.types.PUSH_NEW_COURSE, address }
    ),
    listIsLoading: () => (
      { type: duck.types.LIST_LOADING }
    ),
    listHasErrored: () => (
      { type: duck.types.LIST_ERRORED }
    ),
  }),
});
export const { creators, selectors, initialState } = CourseDuck;
export default CourseDuck.reducer;
