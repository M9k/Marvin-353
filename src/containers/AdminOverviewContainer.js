import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import * as universitySagaAction from '../sagas/adminEmployerSaga';
import RemoveList from '../components/lists/RemoveList';

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
        <RemoveList elements={this.props.adminAccount} removeFnc={this.props.removeAdmin} />
      </div>
    );
  }
}

AdminOverviewComponent.propTypes = {
  adminNumber: PropTypes.number,
  adminAccount: PropTypes.arrayOf(String),
  getAdminNumber: PropTypes.func,
  removeAdmin: PropTypes.func,
  getAllAdmin: PropTypes.func,
};
AdminOverviewComponent.defaultProps = {
  adminNumber: 0,
  adminAccount: [],
  getAdminNumber: () => {},
  removeAdmin: () => {},
  getAllAdmin: () => {},
};

const mapStateToProps = state => ({
  adminNumber: state.university.adminAccount.length,
  adminAccount: state.university.adminAccount,
});
function mapDispatchToProps(dispatch) {
  return {
    removeAdmin: address => dispatch(universitySagaAction.removeAdminAction(address)),
    getAllAdmin: () => dispatch(universitySagaAction.getAllAdminsAction()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminOverviewComponent);
