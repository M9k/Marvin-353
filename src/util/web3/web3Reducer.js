const initialState = {
  web3Instance: null,
};

const web3Reducer = (state = initialState, action) => {
  if (action.type === 'WEB3_INITIALIZED') {
    // TODO: errore qui
    console.log(action.web3ActionInstance);
    return Object.assign({}, state, {
      web3Instance: action.web3ActionInstance,
    });
  }
  return state;
};

export default web3Reducer;
