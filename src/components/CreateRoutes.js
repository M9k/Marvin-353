import AccountEnum from './AccountEnum';
import UniversityRoutes from './routes/UniversityRoutes';
import PublicRoutes from './routes/PublicRoutes';

function CreateRoutes(userType) {
  console.log(userType);
  switch (userType) {
    case AccountEnum.UNIVERSITY:
      return (UniversityRoutes);
    case AccountEnum.NOTLOGGED:
    default:
      return (PublicRoutes);
  }
}
export default CreateRoutes;

