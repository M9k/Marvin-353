import Duck from 'extensible-duck';

const BookingDuck = new Duck({
  namespace: 'marvin',
  store: 'Booking',
  types: ['LIST_LOADING', 'LIST_ERRORED', 'SIGNUP_LOADING', 'SIGNUP_ERRORED', 'SET_COURSES'],
  initialState: {
    loading: false,
    errored: false,
    availableCourses: {
      loading: false,
      errored: false,
      list: [],
    },
  },
  reducer: (state, action, duck) => {
    const { types } = duck;
    switch (action.type) {
      case (types.LIST_LOADING):
        return {
          ...state,
          availableCourses: Object.assign({}, state.availableCourses, { loading: true }),
        };
      case (types.LIST_ERRORED):
        return {
          ...state,
          availableCourses: Object.assign(
            {},
            state.availableCourses,
            { loading: false, errored: true },
          ),
        };
      case (types.SET_COURSES):
        return {
          ...state,
          availableCourses: {
            errored: false,
            loading: false,
            list: action.courses,
          },
        };
      case (types.SIGNUP_LOADING):
        return {
          ...state,
          loading: true,
        };
      case (types.SIGNUP_ERRORED):
        return {
          ...state,
          loading: false,
          errored: false,
        };
      default:
        return state;
    }
  },
  selectors: {

  },
  creators: ({ types }) => ({
    listIsLoading: () => (
      { type: types.LIST_LOADING }
    ),
    listHasErrored: () => (
      { type: types.LIST_ERRORED }
    ),
    setCourses: courses => (
      { type: types.SET_COURSES, courses }
    ),
    signUpLoading: () => (
      { type: types.SIGNUP_LOADING }
    ),
    signUpErrored: () => (
      { type: types.SIGNUP_ERRORED }
    ),
  }),
});
export const { creators, selectors, initialState } = BookingDuck;
export default BookingDuck.reducer;
