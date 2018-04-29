import Duck from 'extensible-duck';
const ManageExamsDuck = new Duck({
  namespace: 'marvin',
  store: 'ManageExams',
  types: [],
  initialState: {},
  reducer: (state, action, duck) => {
    const { types } = duck;
    const { initialState } = duck;
    switch(action.type){

    }
  },
  selectors: {

  },
  creators: duck => ({

  })
});
export const { creators, selectors, initialState } = ManageExamsDuck;
export default ManageExamsDuck.reducer;
