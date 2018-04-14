import React from 'react';
import { IndexRoute, Router } from 'react-router';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import CreateRoutes from './CreateRoutes';
import { history } from '../store';
import PageContainer from './PageContainer';
import Utils from './custom/utils';
import AccountEnum from './AccountEnum';

// build the router
const router = (props) => {
  console.log(props.userType, props.isLogged);
  // const routes = CreateRoutes(props.userType);
  const routesAll = CreateRoutes(AccountEnum.NOTLOGGED);

  const indexComp = routesAll.filter(route => route.path === '/')[0];


  const normalRoutes = routesAll.filter(route => route.path !== '/');
  console.dir(routesAll);

  const routesRouter = (
    <Route path="/" component={PageContainer} links={routesAll} isLogged={props.isLogged} >
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
  isLogged: PropTypes.bool,
  userType: PropTypes.number,
};

router.defaultProps = {
  isLogged: false,
  userType: 0,
};

export default router;
