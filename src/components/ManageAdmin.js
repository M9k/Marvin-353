import React from 'react';
import Header from './global/Header';
import AccountTypes from './AccountEnum';
import AdminEmployerContainer from '../containers/AdminEmployerContainer';
import AdminOverviewContainer from '../containers/AdminOverviewContainer';

class ManageAdmin extends React.Component {
  constructor(props) {
    super(props);
    document.title = 'Manage Admin - Marvin';
  }
  render() {
    return (
      <div id="ManageAdmin">
        <Header accountType={AccountTypes.UNIVERSITY} />
        <h1 className="title">Manage admins</h1>
        <AdminEmployerContainer />
        <AdminOverviewContainer />
      </div>
    );
  }
}

export default ManageAdmin;

