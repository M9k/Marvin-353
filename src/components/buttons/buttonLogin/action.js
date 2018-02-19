import { browserHistory } from 'react-router';
import contract from 'truffle-contract';
import UniversityLoginContract from '../../../../build/contracts/University.json';
import store from '../../../store';


export const USER_LOGGED_IN = 'USER_LOGGED_IN';
function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    payload: user,
  };
}

export function loginUser() {
  alert('login user');

  const web3 = store.getState().web3.web3Instance;

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {
    return function (dispatch) {
      // Using truffle-contract we create the authentication object.
      const login = contract(UniversityLoginContract);
      login.setProvider(web3.currentProvider);

      // Declaring this for later so we can chain functions on Authentication.
      let loginInstance;

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        login.deployed().then((instance) => {
          loginInstance = instance;

          // Attempt to login user.
          loginInstance.login({ from: coinbase })
            .then((result) => {
              // If no error, login user.
              const typeUser = web3.toUtf8(result);

              alert(`You're a : ${typeUser}`);

              dispatch(userLoggedIn({ type: typeUser }));

              return browserHistory.push('/login');
            })
            .catch((result) => {
              // If error, go to signup page.
              console.error(`Wallet ${coinbase} does not have an account!${result}`);

              return browserHistory.push('/signup');
            });
        });
      });
    };
  }
  console.error('Web3 is not initialized.');
}
