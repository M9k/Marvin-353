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
