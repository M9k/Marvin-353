import Duck from 'extensible-duck';
const TeachersListDuck = new Duck({
  namespace: 'marvin',
  store: 'TeachersList',
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
export const { creators, selectors, initialState } = TeachersListDuck;
export default TeachersListDuck.reducer;
