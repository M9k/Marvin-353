import React from 'react';
import { IndexRoute, Router } from 'react-router';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import RoutesFactory from './RoutesFactory';
import { history } from '../store';
import PageContainer from './PageContainer';
import Utils from './custom/utils';
import AccountEnum from '../util/logic/AccountEnum';

// build the router
const router = (props) => {
  const routesAll = RoutesFactory(props.userType);

  const indexComp = routesAll.filter(route => route.path === '/')[0];


  const normalRoutes = routesAll.filter(route => route.path !== '/');
  const logged = props.userType !== AccountEnum.NOTLOGGED;

  const routesRouter = (
    <Route path="/" component={PageContainer} links={routesAll} isLogged={logged} >
      <IndexRoute component={indexComp.component} />
      {normalRoutes.map(route => (
        <Route
          key={Utils.generateKey(route)}
          path={route.path}
          component={route.component}
        />
      ))}
    </Route>
  );

  return (
    <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
      {routesRouter}
    </Router>
  );
};

router.propTypes = {
  userType: PropTypes.number,
};

router.defaultProps = {
  userType: AccountEnum.NOTLOGGED,
};

export default router;
