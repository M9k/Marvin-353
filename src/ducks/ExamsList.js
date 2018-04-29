import Duck from 'extensible-duck';
const ExamsListDuck = new Duck({
  namespace: 'marvin',
  store: 'ExamsList',
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
export const { creators, selectors, initialState } = ExamsListDuck;
export default ExamsListDuck.reducer;
