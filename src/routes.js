import { Route, IndexRoute } from 'react-router';
import React from 'react';

import App from './components/App';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import Help from './components/Help';
import Price from './components/Price';
import NotFound from './components/NotFound';
import License from './components/License';
import ManageAdmin from './components/ManageAdmin';


const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="login" component={Login} />
    <Route path="logout" component={Logout} />
    <Route path="register" component={NotFound} />
    <Route path="license" component={License} />
    <Route path="help" component={Help} />
    <Route path="price" component={Price} />
    <Route path="manageadmin" component={ManageAdmin} />
    <Route path="*" component={NotFound} />
  </Route>
);
export default routes;
