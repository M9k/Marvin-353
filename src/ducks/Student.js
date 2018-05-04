import Duck from 'extensible-duck';
import { updateObjInArr } from '../util/js_helpers';

const StudentDuck = new Duck({
  namespace: 'marvin',
  store: 'Student',
  types: ['SET_EXAMS', 'PUSH_NEW_SUBSCRIPTION', 'SET_CREDITS', 'LIST_LOADING', 'LIST_ERRORED'],
  initialState: {
    loading: false,
    errored: false,
    examsList: [],
    credits: null,
    graduationCredits: null,
  },
  reducer: (state, action, duck) => {
    const { types } = duck;
    switch (action.type) {
      case (types.SET_EXAMS):
        return {
          loading: false,
          errored: false,
          examsList: action.exams,
        };
      case (types.PUSH_NEW_SUBSCRIPTION):
        return {
          loading: false,
          errored: false,
          examsList: updateObjInArr(
            state.examsList,
            obj => obj.address === action.address,
            action.subscription,
          ),
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
    setExams: exams => (
      { type: duck.types.SET_EXAMS, exams }
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
