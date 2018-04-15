import AccountEnum from '../util/logic/AccountEnum';
import UniversityRoutes from './routes/UniversityRoutes';
import PublicRoutes from './routes/PublicRoutes';
import CommonRoutes from './routes/CommonRoutes';
import Logout from './public/Logout';

/**
 * @return {array} of Objects links/routes
 */
function RoutesFactory(userType) {
  console.log('Creating routing for:');
  console.log(userType);
  let routes = [];
  switch (userType) {
    case AccountEnum.UNIVERSITY:
      routes = routes.concat(UniversityRoutes);
      break;
    case AccountEnum.NOTLOGGED:
    default:
      routes = routes.concat(PublicRoutes);
      break;
  }
  routes = routes.concat(CommonRoutes);
  if (userType !== null && userType !== AccountEnum.NOTLOGGED) {
    console.log('LOGOUT');
    const logout = [
      {
        path: 'logout',
        label: 'Logout',
        position: 'right',
        component: Logout,
      },
    ];
    routes = routes.concat(logout);
  }
  return routes;
}
export default RoutesFactory;
