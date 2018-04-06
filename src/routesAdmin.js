import { IndexRoute, Route } from 'react-router';
import React from 'react';

import App from './components/App';
import Home from './components/Home';
import Logout from './components/Logout';
import Help from './components/Help';
import Price from './components/Price';
import NotFound from './components/NotFound';
import License from './components/License';
import ManageAdmin from './components/ManageAdmin';

const routes = [
  {
    path: 'logout',
    label: 'Log-out',
    component: Logout,
  },
  {
    path: 'manageadmin',
    label: 'Admins',
    component: ManageAdmin,
    onMenu: true,
  },
  {
    path: 'license',
    label: 'License?',
    component: License,
  },
  {
    path: 'help',
    label: 'Help me',
    component: Help,
    onMenu: true,
  },
  {
    path: 'price',
    label: 'Price $',
    component: Price,
    onMenu: true,
  },
  {
    path: '*',
    component: NotFound,
  },
];

const routesAdmin = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    {routes.map((route, index) => (
      <Route
// eslint-disable-next-line react/no-array-index-key
        key={index}
        path={route.path}
        component={route.component}
      />
    ))}
  </Route>
);
export default routesAdmin;
