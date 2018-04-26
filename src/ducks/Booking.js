import Duck from 'extensible-duck';
const BookingDuck = new Duck({
  namespace: 'marvin',
  store: 'Booking',
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
export const { creators, selectors, initialState } = BookingDuck;
export default BookingDuck.reducer;
