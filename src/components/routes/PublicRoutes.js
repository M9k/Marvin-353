import Index from '../public/Index';
import login from '../../containers/Login';
import Register from '../public/Register';
import testPageTable from '../template/testPageTable';

const PublicRoutes = [
  {
    path: '/',
    label: '/',
    position: 'none',
    component: Index,
  },
  {
    path: 'login',
    label: 'Login',
    position: 'left',
    component: login,
  },
  {
    path: 'request',
    label: 'Register',
    position: 'left',
    component: Register,
  },
  {
    path: 'testTable',
    label: 'testTable',
    position: 'right',
    component: testPageTable,
  },
];

export default PublicRoutes;
