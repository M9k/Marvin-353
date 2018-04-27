import Duck from 'extensible-duck';
import { copyNPush } from '../util/js_helpers';

const TeacherExamDuck = new Duck({
  namespace: 'marvin',
  store: 'TeacherExam',
  types: ['PUSH_EXAM', 'LIST_LOADING', 'LIST_ERRORED', 'LIST_FINISHED'],
  initialState: {
    loading: false,
    errored: false,
    list: [],
  },
  reducer: (state, action, { types }) => {
    switch (action.type) {
      case (types.PUSH_EXAM):
        return {
          ...state,
          list: copyNPush(state.list, action.exam),
        };
      case (types.LIST_LOADING):
        return {
          ...state,
          loading: true,
        };
      case (types.LIST_ERRORED):
        return {
          ...state,
          loading: false,
          errored: true,
          list: [],
        };
      case (types.LIST_FINISHED):
        return {
          ...state,
          loading: false,
          errored: false,
        };
      default:
        return state;
    }
  },
  selectors: {
    // examByCode: state => ({}),
    // examByCourse: state => ({}),
  },
  creators: ({ types }) => ({
    pushExam: exam => (
      { type: types.PUSH_EXAM, exam }
    ),
    listIsLoading: () => (
      { type: types.LIST_LOADING }
    ),
    listHasErrored: () => (
      { type: types.LIST_ERRORED }
    ),
    listHasFinished: () => (
      { type: types.LIST_FINISHED }
    ),
  }),
});
export const { creators, selectors, initialState } = TeacherExamDuck;
export default TeacherExamDuck.reducer;
