import React from 'react';
import PropTypes from 'prop-types';
import Button from '../buttons/Button';
import AccountTypes from '../AccountEnum';
import AlertDismissable from '../alert/AlertDismissable';

const HomeDefault = (props) => {
  document.title = 'Home - Marvin';
  let alert = null;
  if (!props.metamask) {
    alert = <AlertDismissable type="danger"> MetaMask is not installed. Click <a href="/help#installMetaMask">here</a> for more info.</AlertDismissable>;
  } else if (props.account === null) {
    alert = <AlertDismissable type="danger"> MetaMask is locked. Click <a href="/help#unlockMetaMask">here</a> for more info.</AlertDismissable>;
  }

  return (
    <div className="page-home">
      {alert}
      <div className="page-content">
        <Button link="/login/">Login</Button><br />
        <Button link="/register/">Register</Button><br />
        <h2>Metamask installato: {props.metamask ? 'SI' : 'NO'}</h2><br />
        <h2>Metamask sbloccato: {props.account !== null ? 'SI' : 'NO'}</h2><br />
        <h2>Versione di Web3: {typeof web3 !== 'undefined' && web3 !== null ? web3.version.api : 'NOT FOUND!!'}</h2><br />
        <h2>Account in uso: {props.account !== null ? props.account : 'NOT FOUND!!'}</h2><br />
      </div>
    </div>
  );
};

HomeDefault.propTypes = {
  metamask: PropTypes.bool,
  account: PropTypes.string,
  isLogged: PropTypes.bool,
  accountType: PropTypes.oneOf(Object.values(AccountTypes)),
};

HomeDefault.defaultProps = {
  metamask: false,
  account: null,
  isLogged: false,
  accountType: null,
};

export default HomeDefault;
