import AccountEnum from '../util/logic/AccountEnum';
import UniversityRoutes from './routes/UniversityRoutes';
import PublicRoutes from './routes/PublicRoutes';
import CommonRoutes from './routes/CommonRoutes';

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
  return routes.concat(CommonRoutes);
}
export default RoutesFactory;

