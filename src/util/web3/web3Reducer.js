import { WEB3_INITIALIZED } from './getWeb3';

const initialState = {
  web3Instance: null,
};

const web3Reducer = (state = initialState, action) => {
  if (action.type === WEB3_INITIALIZED) {
    // TODO: questa parte funziona correttamente
    console.log('Reducer is started');
    const newState = Object.assign({}, state, { web3Instance: action.web3ActionInstance });
    console.log('return the state');
    console.log(newState);
    // TODO: errore nel return
    return newState;
  }
  console.log('return the old state');
  console.log(state);
  return state;
};

export default web3Reducer;
