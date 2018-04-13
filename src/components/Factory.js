import AccountEnum from './AccountEnum';
import React from 'react';
import {Route} from 'react-router';
import UniversityRoutes from './routes/UniversityRoutes';
import PublicRoutes from './routes/PublicRoutes';
import Home from './Home';

function CreateRoutes(userType) {
  console.log(userType);
  switch (userType) {
    case AccountEnum.NOTLOGGED:
      return (<PublicRoutes />);
    case AccountEnum.UNIVERSITY:
      return (<UniversityRoutes />);
    default:
      return (<Route path="*" components={Home} />);
  }
}
export default CreateRoutes;

