import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HomeDefault from './HomeDefault';
import AccountTypes from '../AccountEnum';

const HomeFactory = (props) => {
  switch (props.accountType) {
    case null:
    case AccountTypes.NOTLOGGED:
      return (
        <HomeDefault
          metamask={props.metamask}
          account={props.account}
          isLogged={props.isLogged}
          accountType={props.accountType}
        />
      );
    case AccountTypes.UNIVERSITY:
    case AccountTypes.ADMIN:
    case AccountTypes.PROFESSOR:
    case AccountTypes.STUDENT:
      return (
        <div id="TODO-HOME">
          TODO
        </div>
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
  accountType: null,
};

export default HomeFactory;
