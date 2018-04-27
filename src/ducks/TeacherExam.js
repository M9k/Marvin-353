import Duck from 'extensible-duck';
const TeacherExamDuck = new Duck({
  namespace: 'marvin',
  store: 'TeacherExam',
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
export const { creators, selectors, initialState } = TeacherExamDuck;
export default TeacherExamDuck.reducer;
