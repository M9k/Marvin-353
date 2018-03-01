import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
// import AccountTypes from '../AccountEnum';
import AlertDismissable from '../alert/AlertDismissable';

const HomeDefault = (props) => {
  document.title = 'Home - Marvin';

  return (
    <div className="page-home">
      {!props.metamask &&
        <AlertDismissable type="danger"> MetaMask is not installed. Click <a href="/help#installMetaMask">here</a> for more info.</AlertDismissable>
      }
      {props.metamask && props.account === null &&
        <AlertDismissable type="danger"> MetaMask is locked. Click <a href="/help#unlockMetaMask">here</a> for more info.</AlertDismissable>
      }
      <div className="page-content">
        <Button href="/login">Login</Button><br />
        <Button href="/register">Register</Button><br />
        <h2>Metamask installato: {props.metamask ? 'SI' : 'NO'}</h2><br />
        <h2>Metamask sbloccato: {props.account !== null ? 'SI' : 'NO'}</h2><br />
        <h2>Versione di Web3: {typeof web3 !== 'undefined' && web3 !== null ? web3.version.api : 'NOT FOUND!!'}</h2><br />
        <h2>Account in uso: {props.account !== null ? props.account : 'NOT FOUND!!'}</h2><br />
      </div>
    </div>
  );
};

HomeDefault.propTypes = {
  metamask: PropTypes.bool.isRequired,
  account: PropTypes.string.isRequired,
  // isLogged: PropTypes.bool.isRequired,
  // accountType: PropTypes.oneOf(Object.values(AccountTypes)).isRequired,
};

export default HomeDefault;
