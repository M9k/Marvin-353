import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HomeFactory from './home/HomeFactory';
import Header from './global/Header';
import AccountTypes from './AccountEnum';

// Home page component
const Home = props => (
  <div id="home">
    <Header accountType={props.accountType !== null && props.account !== null ?
      props.accountType : AccountTypes.NOTLOGGED}
    />
    <HomeFactory
      metamask={props.metamask}
      account={props.account}
      isLogged={props.isLogged}
      accountType={props.accountType !== null && props.account !== null ?
        props.accountType : AccountTypes.NOTLOGGED}
    />
  </div>
);

Home.propTypes = {
  metamask: PropTypes.bool,
  account: PropTypes.string,
  isLogged: PropTypes.bool,
  accountType: PropTypes.oneOf(Object.values(AccountTypes)),
};

Home.defaultProps = {
  metamask: false,
  account: null,
  isLogged: false,
  accountType: AccountTypes.NOTLOGGED,
};

const mapStateToProps = state => ({
  metamask: state.user.metamask,
  account: state.user.account,
  isLogged: state.user.logged,
  accountType: state.user.role,
});

export default connect(mapStateToProps)(Home);
