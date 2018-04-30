import Duck from 'extensible-duck';

const ExamsListDuck = new Duck({
  namespace: 'marvin',
  store: 'ExamsList',
  types: ['SET_LIST', 'SET_PROFESSOR', 'LIST_LOADING', 'LIST_ERRORED'],
  initialState: {
    errored: false,
    loading: false,
    list: [],
  },
  reducer: (state, action, duck) => {
    const { types } = duck;
    switch (action.type) {
      case (types.LIST_IS_LOADING):
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
  }),
});
export const { creators, selectors, initialState } = ExamsListDuck;
export default ExamsListDuck.reducer;
