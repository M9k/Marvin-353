import Duck from 'extensible-duck';

const TeacherExamDuck = new Duck({
  namespace: 'marvin',
  store: 'TeacherExam',
  types: ['PUSH_EXAM', 'LIST_LOADING', 'LIST_ERRORED', 'LIST_FINISHED'],
  initialState: {
    loading: false,
    errored: false,
    list: [],
  },
  reducer: (state, action, duck) => {
    const { types } = duck;
    const { initialState } = duck;
    switch (action.type) {
      case (types.PUSH_EXAM):
      case (types.LIST_LOADING):
      case (types.LIST_ERRORED):
      case (types.LIST_FINISHED):
      default:
        return state;
    }
  },
  selectors: {
    examByCode: state => ({}),
    examByCourse: state => ({}),
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
