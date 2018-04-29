import Duck from 'extensible-duck';
const CourseExamsDuck = new Duck({
  namespace: 'marvin',
  store: 'CourseExams',
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
export const { creators, selectors, initialState } = CourseExamsDuck;
export default CourseExamsDuck.reducer;
