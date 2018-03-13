import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './global/Header';
import AccountTypes from './AccountEnum';

const Price = props => (
  <div className="page-home">
    <Header accountType={props.accountType !== null ? props.accountType : AccountTypes.NOTLOGGED} />
    <h1 className="title">Price</h1>
    <p>Block number: TODO</p>
    <p>TODO</p>
  </div>
);

Price.propTypes = {
  accountType: PropTypes.oneOf(Object.values(AccountTypes)),
};

Price.defaultProps = {
  accountType: AccountTypes.NOTLOGGED,
};

const mapStateToProps = state => ({
  accountType: state.user.role,
});

export default connect(mapStateToProps)(Price);

