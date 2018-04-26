import Duck from 'extensible-duck';
import { copyNPush } from '../util/js_helpers';

const EvaluatorDuck = new Duck({
  namespace: 'marvin',
  store: 'Evaluator',
  types: ['PUSH_STUDENT', 'LIST_LOADING', 'LIST_ERRORED', 'LIST_FINISHED'],
  initialState: {
    loading: false,
    errored: false,
    address: null,
    index: null,
    code: null,
    course: null,
    studentList: {
      errored: false,
      loading: false,
      list: [],
    }
  },
  reducer: (state, action, duck) => {
    const { types } = duck;
    const { initialState } = duck;
    switch (action.type) {
      case (types.PUSH_STUDENT):
        return {
          ...state,
          studentList: Object.assign(
            {},
            state.studentList,
            { list: copyNPush(state.studentList.list, action.student) }
          ),
        };
      case (types.LIST_LOADING):
        return {
          ...state,
          studentList: Object.assign(
            {},
            state.studentList,
            { loading: true, errored: false }
          )
        };
      case (types.LIST_ERRORED):
        return {
          ...state,
          studentList: Object.assign(
            {},
            state.studentList,
            { loading: false, errored: true }
          ),
        };
      case (types.LIST_FINISHED):
        return {
          ...state,
          studentList: Object.assign(
            {},
            state.studentList,
            { loading: false, errored: false }
          ),
        };
      default:
        return state;
    }
  },
  selectors: {

  },
  creators: ({ types }) => ({
    pushStudent: student => (
      { type: types.PUSH_STUDENT, student }
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
export const { creators, selectors, initialState } = EvaluatorDuck;
export default EvaluatorDuck.reducer;
