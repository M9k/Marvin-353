import { call, put, fork } from 'redux-saga/effects';
import { creators as actionCreators } from '../ducks/Booking';

const actionType = type => `marvin/BookingSaga/${type}`;

export const creators = {};

export default function* handler() {
  yield [];
};
