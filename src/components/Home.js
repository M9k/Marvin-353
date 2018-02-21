import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HomeFactory from './home/HomeFactory';
import Header from './global/Header';
import AccountTypes from './AccountEnum';

// Home page component
const Home = props => (
  <div id="home">
    <Header accountType={props.accountType} />
    <HomeFactory
      metamask={props.metamask}
      account={props.account}
      isLogged={props.isLogged}
      accountType={props.accountType}
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
  accountType: null,
};

const mapStateToProps = state => ({
  metamask: state.user.metamask,
  account: state.user.account,
  isLogged: state.user.logged,
  accountType: state.user.role,
});

export default connect(mapStateToProps)(Home);
