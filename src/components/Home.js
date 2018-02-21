import React from 'react';
import Header from './global/Header';
import Button from './buttons/Button';
import AlertDismissable from './alert/AlertDismissable';

// Home page component
// TODO: Cambiare la home in base se l'utente è già autenticato nel sistema
const Home = (props) => {
  document.title = 'Home - Marvin';
  // TODO: Prelevare il tipo di account da Redux
  let alert = null;
  if ((typeof web3) === 'undefined') {
    alert = <AlertDismissable type="danger"> MetaMask is not installed. Click <a href="/help/">here</a> for more info.</AlertDismissable>;
  } else {
    if ((typeof web3) !== 'undefined' && (typeof web3.eth.accounts[0]) === 'undefined') {
      alert = <AlertDismissable type="danger"> MetaMask is locked. Click <a href="/help/">here</a> for more info.</AlertDismissable>;
      // TODO: quando un account si sblocca, non viene riconosciuto l'account se non si riavvia l'app
    }
  }

  return (
    <div className="page-home">
      <Header />
      {alert}
      <div className="page-content">
        <Button link="/login/">Login</Button><br />
        <Button link="/register/">Register</Button><br />
        <h2>Metamask installato: {typeof web3 !== 'undefined' ? 'SI' : 'NO'}</h2><br />
        <h2>Metamask sbloccato: {typeof web3 !== 'undefined' && typeof web3.eth.accounts[0] !== 'undefined' ? 'SI' : 'NO'}</h2><br />
        <h2>Versione di Web3: {typeof web3 !== 'undefined' && web3 !== null ? web3.version.api : 'NOT FOUND!!'}</h2><br />
        <h2>Account in uso: {typeof web3 !== 'undefined' && typeof web3.eth.accounts[0] !== 'undefined' ? web3.eth.accounts[0] : 'NOT FOUND!!'}</h2><br />
      </div>
    </div>
  );
};

export default Home;
