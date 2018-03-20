import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { universityAction } from '../actions/actions';

import FormAddAdmin from '../components/form/FormAddAdmin';

class AdminEmployerContainer extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div id="admin-employer">
        <h2>Add a new admin</h2>
        <FormAddAdmin addAdmin={this.props.addAdmin} />
      </div>
    )
  }
}

AdminEmployerContainer.propTypes = {
  addAdmin: PropTypes.func
};

AdminEmployerContainer.defaultProps = {
  addAdmin: () => {}
};

function mapDispatchToProps(dispatch){
  return {
    addAdmin: _address => dispatch({
      type: universityAction.REMOVE_ADMIN,
      address: _address,
    })
  }
}

export default connect(() => {}, mapDispatchToProps)(AdminEmployerContainer);
