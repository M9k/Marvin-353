import React from 'react';
import { Router } from 'react-router';
import { history } from './store';
import routes from './routes';

// build the router
const router = (
  <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
    {routes}
  </Router>
);

// export
export default router;
