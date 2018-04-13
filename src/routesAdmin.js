import { IndexRoute, Route } from 'react-router';
import React from 'react';

import App from './components/App';
import Home from './public/Home';
import Logout from './public/Logout';
import NotFound from './public/NotFound';

const routes = [
  {
    path: 'logout',
    label: 'Log-out',
    component: Logout,
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
