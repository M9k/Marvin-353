import Duck from 'extensible-duck';
import { copyNPush, copyNPop } from '../util/js_helpers';

const StudentDuck = new Duck({
  namespace: 'marvin',
  store: 'Student',
  types: ['SET_ENROLLED_EXAMS', 'SET_OPTIONAL_EXAMS', 'PUSH_NEW_SUBSCRIPTION', 'SET_CREDITS', 'LIST_LOADING', 'LIST_ERRORED'],
  initialState: {
    loading: false,
    errored: false,
    enrolledExamsList: [],
    optionalExamsList: [],
    credits: null,
    graduationCredits: null,
  },
  reducer: (state, action, duck) => {
    const { types } = duck;
    switch (action.type) {
      case (types.SET_ENROLLED_EXAMS):
        return {
          loading: false,
          errored: false,
          enrolledExamsList: action.exams,
        };
      case (types.SET_OPTIONAL_EXAMS):
        return {
          loading: false,
          errored: false,
          optionalExamsList: action.exams,
        };
      case (types.PUSH_NEW_SUBSCRIPTION):
        return {
          loading: false,
          errored: false,
          enrolledExamsList: copyNPush(state.enrolledExamsList, action.exam),
          optionalExamsList: copyNPop(state.optionalExamsList, el => el === action.exam),
        };
      case (types.SET_CREDITS):
        return {
          loading: false,
          errored: false,
          credits: action.credits,
          graduationCredits: action.graduationCredits,
        };
      case (types.LIST_LOADING):
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
      default:
        return state;
    }
  },
  selectors: {

  },
  creators: duck => ({
    setEnrolledExams: exams => (
      { type: duck.types.SET_ENROLLED_EXAMS, exams }
    ),
    setOptionalExams: exams => (
      { type: duck.types.SET_OPTIONAL_EXAMS, exams }
    ),
    pushNewSubscription: exam => (
      { type: duck.types.PUSH_NEW_SUBSCRIPTION, exam }
    ),
    setCredits: (credits, graduationCredits) => (
      { type: duck.types.SET_CREDITS, credits, graduationCredits }
    ),
    listIsLoading: () => (
      { type: duck.types.LIST_LOADING }
    ),
    listHasErrored: () => (
      { type: duck.types.LIST_ERRORED }
    ),
  }),
});
export const { creators, selectors, initialState } = StudentDuck;
export default StudentDuck.reducer;
