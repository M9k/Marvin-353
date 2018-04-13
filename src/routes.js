import { Route, IndexRoute } from 'react-router';
import React from 'react';

import App from './components/App';
import Home from './public/Home';
import NotFound from './public/NotFound';


const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="register" component={NotFound} />
    <Route path="*" component={NotFound} />
  </Route>
);
export default routes;
