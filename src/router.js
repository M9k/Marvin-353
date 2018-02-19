import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { history } from './store';
import App from './components/App';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import Help from './components/Help';
import Price from './components/Price';
import NotFound from './components/NotFound';
import License from './components/License';

// build the router
const router = (
  <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} />
      <Route path="register" component={NotFound} />
      <Route path="license" component={License} />
      <Route path="help" component={Help} />
      <Route path="price" component={Price} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);

// export
export default router;
