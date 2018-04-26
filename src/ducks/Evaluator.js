import Duck from 'extensible-duck';
import { copyNPush } from '../util/js_helpers';

const setVote = (oldList, studentIndex, vote) => {
  const list = Object.assign([], oldList);
  const studentId = list.findIndex(std => std.studentIndex === studentIndex);
  if (studentId === -1) return list;
  list[studentId].vote = vote;
  return list;
};
const EvaluatorDuck = new Duck({
  namespace: 'marvin',
  store: 'Evaluator',
  types: [
    'PUSH_STUDENT',
    'LIST_LOADING',
    'LIST_ERRORED',
    'LIST_FINISHED',
    'VOTE_LOADING',
    'VODE_ERRORED',
    'SET_VOTE',
  ],
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
    },
  },
  reducer: (state, action, duck) => {
    const { types } = duck;
    switch (action.type) {
      case (types.PUSH_STUDENT):
        return {
          ...state,
          studentList: Object.assign(
            {},
            state.studentList,
            { list: copyNPush(state.studentList.list, action.student) },
          ),
        };
      case (types.LIST_LOADING):
        return {
          ...state,
          studentList: Object.assign(
            {},
            state.studentList,
            { loading: true, errored: false },
          ),
        };
      case (types.LIST_ERRORED):
        return {
          ...state,
          studentList: Object.assign(
            {},
            state.studentList,
            { loading: false, errored: true },
          ),
        };
      case (types.LIST_FINISHED):
        return {
          ...state,
          studentList: Object.assign(
            {},
            state.studentList,
            { loading: false, errored: false },
          ),
        };
      case (types.VOTE_LOADING):
        return {
          ...state,
          loading: true,
          errored: false,
        };
      case (types.VOTE_ERRORED):
        return {
          ...state,
          loading: false,
          errored: true,
        };
      case (types.SET_VOTE):
        return {
          ...state,
          loading: false,
          errored: false,
          studentList: {
            loading: false,
            errored: false,
            list: setVote(state.studentList.list, action.studentIndex, action.vote),
          },
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
    voteIsLoading: () => (
      { type: types.VOTE_LOADING }
    ),
    voteHasErrored: () => (
      { type: types.VOTE_ERRORED }
    ),
    setVote: (studentIndex, vote) => (
      { type: types.SET_VOTE, studentIndex, vote }
    ),
  }),
});
export const { creators, selectors, initialState } = EvaluatorDuck;
export default EvaluatorDuck.reducer;
