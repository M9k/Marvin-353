import React from 'react';
import PropTypes from 'prop-types';
import AccountTypes from '../AccountEnum';
import HomeDefault from './HomeDefault';
import HomeUniversity from './HomeUniversity';

const HomeFactory = (props) => {
  switch (props.accountType) {
    case AccountTypes.UNIVERSITY:
      return (
        <HomeUniversity />
      );
    case AccountTypes.ADMIN:
      return (
        <div id="TODO-HOME">
          TODO - Admin
        </div>
      );
    case AccountTypes.PROFESSOR:
      return (
        <div id="TODO-HOME">
          TODO - professor
        </div>
      );
    case AccountTypes.STUDENT:
      return (
        <div id="TODO-HOME">
          TODO - student
        </div>
      );
    case AccountTypes.NOTLOGGED:
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
  metamask: PropTypes.bool.isRequired,
  account: PropTypes.string.isRequired,
  isLogged: PropTypes.bool.isRequired,
  accountType: PropTypes.oneOf(Object.values(AccountTypes)).isRequired,
};

export default HomeFactory;
