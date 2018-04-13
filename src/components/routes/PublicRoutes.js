import { Route, IndexRoute } from 'react-router';
import React from 'react';

import App from '../public/App';
import Home from '../public/Home';

console.log('Sono in public');
const PublicRoutes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="*" component={Home} />
  </Route>
);
export default PublicRoutes;
