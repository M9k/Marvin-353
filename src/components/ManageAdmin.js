import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// TODO - riabilitare ESLint
/* eslint-disable */
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
// TODO - riabilitare ESLint
/* eslint-enable */
import Header from './global/Header';
import { universityAction } from '../actions/actions';
import FormAddAdmin from './form/FormAddAdmin';

class ManageAdmin extends React.Component {
  constructor(props) {
    super(props);
    document.title = 'Manage Admin - Marvin';
  }
  componentWillMount() {
    this.props.getAdminNumber();
  }

  // TODO - riabilitare ESLint
/* eslint-disable */
  render() {
    const list = [];
    for (let i = 0; i < this.props.adminNumber; i += 1) {
      const nr = this.props.getAdmin(i);
      console.log(nr);
      //list.push(<ListGroupItem>{nr}</ListGroupItem>);
    }

    return (
      <div id="ManageAdmin">
        <Header />
        <div className="page-content">
          <Button onClick={this.props.getAdminNumber}>Admins number:</Button>
         ={this.props.adminNumber}<br />
        </div>
        <FormAddAdmin addAdmin={this.props.addAdmin} />
        <h2>Admin list</h2>
        ={this.props.adminNumber}<br />
        <ListGroup>
        </ListGroup>
      </div>
    );
  }
  // TODO - riabilitare ESLint
  /* eslint-enable */
}

ManageAdmin.propTypes = {
  adminNumber: PropTypes.number,
  getAdminNumber: PropTypes.func,
  addAdmin: PropTypes.func,
  getAdmin: PropTypes.func,
};

ManageAdmin.defaultProps = {
  adminNumber: 0,
  getAdminNumber: () => {},
  addAdmin: () => {},
  getAdmin: () => {},
};

const mapStateToProps = state => ({
  adminNumber: state.university.adminNumber,
});

function mapDispatchToProps(dispatch) {
  return {
    // return the number of admins
    getAdminNumber: () => dispatch({
      type: universityAction.GET_ADMIN_NUMBER,
    }),
    // add a new admin
    addAdmin: _address => dispatch({
      type: universityAction.ADD_NEW_ADMIN,
      address: _address,
    }),
    // return the address of a admin
    getAdmin: _number => dispatch({
      type: universityAction.GET_ADMIN,
      number: _number,
      account: null,
    }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAdmin);

