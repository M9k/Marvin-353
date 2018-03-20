import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { universityAction } from '../actions/actions';

import FormAddAdmin from '../components/form/FormAddAdmin';

class AdminEmployerContainer extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <div id="admin-employer">
        <h2>Add a new admin</h2>
        <FormAddAdmin addAdmin={this.props.addAdmin} />
      </div>
    );
  }
}

AdminEmployerContainer.propTypes = {
  addAdmin: PropTypes.func,
};

AdminEmployerContainer.defaultProps = {
  addAdmin: () => {},
};
function mapStateToProps() {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {
    addAdmin: _address => dispatch({
      type: universityAction.ADD_NEW_ADMIN,
      address: _address,
    }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminEmployerContainer);
