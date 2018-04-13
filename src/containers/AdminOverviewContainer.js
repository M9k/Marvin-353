import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { creators as universitySagaAction } from '../sagas/AdminEmployerSaga';
import { loginAction } from '../sagas/SessionSaga';


export class AdminOverviewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.refreshData = this.refreshData.bind(this);
  }
  componentDidMount() {
    if (this.props.adminAccount.length === 0) this.refreshData();
  }
  refreshData() {
    this.props.getAllAdmin();
  }
  render() {
    return (
      <div id="admin-overview">
        <h2>AdminList</h2>
        <Button onClick={this.refreshData}>Refresh</Button><br />
        <p>Number of admins: {this.props.adminNumber}</p>
        <Button onClick={this.props.login}>Login</Button>
        <p>{this.props.role}</p>
        <p>{this.props.data}</p>
      </div>
    );
  }
}

AdminOverviewComponent.propTypes = {
  adminNumber: PropTypes.number,
  adminAccount: PropTypes.arrayOf(String),
  getAllAdmin: PropTypes.func,
  role: PropTypes.number,
  data: PropTypes.string,
  login: PropTypes.func,
};
AdminOverviewComponent.defaultProps = {
  adminNumber: 0,
  adminAccount: [],
  getAllAdmin: () => {},
  role: -1,
  data: '{}',
  login: () => {},
};

const mapStateToProps = state => ({
  adminNumber: state.university.adminAccount.length,
  adminAccount: state.university.adminAccount,
  role: state.user.role,
  data: JSON.stringify(state.user),
});
function mapDispatchToProps(dispatch) {
  return {
    removeAdmin: address => dispatch(universitySagaAction.removeAdminAction(address)),
    getAllAdmin: () => dispatch(universitySagaAction.getAllAdminsAction()),
    login: () => dispatch(loginAction()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminOverviewComponent);
