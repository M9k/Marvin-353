import AccountEnum from '../util/logic/AccountEnum';
import UniversityRoutes from './routes/UniversityRoutes';
import PublicRoutes from './routes/PublicRoutes';

function RoutesFactory(userType) {
  console.log('Creating routing for:');
  console.log(userType);
  switch (userType) {
    case AccountEnum.UNIVERSITY:
      return (UniversityRoutes);
    case AccountEnum.NOTLOGGED:
    default:
      return (PublicRoutes);
  }
}
export default RoutesFactory;

