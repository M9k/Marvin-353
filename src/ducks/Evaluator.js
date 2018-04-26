import Duck from 'extensible-duck';
const EvaluatorDuck = new Duck({
  namespace: 'marvin',
  store: 'Evaluator',
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
export const { creators, selectors, initialState } = EvaluatorDuck;
export default EvaluatorDuck.reducer;
