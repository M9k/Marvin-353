import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { universityAction } from '../actions/actions';
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
    this.props.getAdminNumber();
    this.props.getAllAdmin(this.props.adminNumber);
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
  adminNumber: state.university.adminNumber,
  adminAccount: state.university.adminAccount,
});
function mapDispatchToProps(dispatch) {
  return {
    getAdminNumber: () => dispatch({
      type: universityAction.GET_ADMIN_NUMBER,
    }),
    removeAdmin: _address => dispatch({
      type: universityAction.REMOVE_ADMIN,
      address: _address,
    }),
    getAllAdmin: _number => dispatch({
      type: universityAction.GET_ALL_ADMINS,
      number: _number,
    }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminOverviewComponent);
