import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HomeDefault from './HomeDefault';
import AccountTypes from '../AccountEnum';
import Button from '../buttons/Button';
import WelcomeLabel from '../label/WelcomeLabel';

const HomeFactory = (props) => {
  switch (props.accountType) {
    case AccountTypes.UNIVERSITY:
      return (
        <div id="TODO-HOME">
          <h1>Benvenuto fondatore</h1>
          <div className="page-content">
            <Button link="/">Gestione Admin</Button><br />
            <Button link="/">Metti in pausa sistema</Button><br />
          </div>
        </div>
      );
    case AccountTypes.ADMIN:
      return (
        <div id="TODO-HOME">
          <div className="page-content">
            <Button link="/gestioneUtenti/">Gestione Utenti</Button><br />
            <Button link="/">Gestione Anni Accademici</Button><br />
            <Button link="/">Gestione Corsi di Laurea</Button><br />
          </div>
        </div>
      );
    case AccountTypes.PROFESSOR:
      return (
        <div id="TODO-HOME">
          TODO - professore
        </div>
      );
    case AccountTypes.STUDENT:
      return (
        <div id="TODO-HOME">
          TODO - studente
        </div>
      );
    case AccountTypes.NOTLOGGED:
      return (
        <HomeDefault
          metamask={props.metamask}
          account={props.account}
          isLogged={props.isLogged}
          accountType={props.accountType}
        />
      );
    default:
      return (
        <HomeDefault
          metamask={props.metamask}
          account={props.account}
          isLogged={props.isLogged}
          accountType={props.accountType}
        />
      );
  }
};

HomeFactory.propTypes = {
  metamask: PropTypes.bool,
  account: PropTypes.string,
  isLogged: PropTypes.bool,
  accountType: PropTypes.oneOf(Object.values(AccountTypes)),
};

HomeFactory.defaultProps = {
  metamask: false,
  account: null,
  isLogged: false,
  accountType: AccountTypes.NOTLOGGED,
};

export default HomeFactory;
