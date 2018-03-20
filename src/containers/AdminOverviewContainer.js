import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { universityAction } from '../actions/actions'
import { Button } from 'react-bootstrap';
import RemoveList from '../components/lists/RemoveList';

class AdminOverviewContainer extends React.Component {
  constructor(props){
    super(props);
    this.refreshData = this.refreshData.bind(this);
  }
  componentDidMount(){
    if(this.props.adminAccount.length == 0) this.refreshData();
  }
  refreshData(){
    this.props.getAdminNumber();
    this.props.getAllAdmin();
  }
  render(){
    return (
      <div id="admin-overview">
        <h2>AdminList</h2>
        <Button onClick={this.refreshData}>Refresh</Button><br/>
        <p>Number of admins: {this.props.adminNumber}</p>
        <RemoveList elements={this.props.adminAccount} removeFnc={this.props.removeAdmin}/>
      </div>
    );
  }
}

AdminOverviewContainer.propTypes = {
  adminNumber: PropTypes.number,
  adminAccount: PropTypes.arrayOf(String),
  getAdminNumber: PropTypes.func,
  removeAdmin: PropTypes.func,
  getAllAdmin: PropTypes.func,
};
AdminOverviewContainer.defaultProps = {
  adminNumber: 0,
  adminAccount: [],
  getAdminNumber: () => {},
  removeAdmin: () => {},
  getAllAdmin: () => {},
};

const mapStateToProps = state =>({
  adminNumber: state.university.adminNumber,
  adminAccount: state.university.adminAccount,
});
function mapDispatchToProps(dispatch){
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminOverviewContainer);
