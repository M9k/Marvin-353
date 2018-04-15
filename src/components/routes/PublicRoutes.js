import Index from '../public/Index';
import Register from '../public/Register';
import testPageTable from '../template/testPageTable';
import LoginPage from '../public/LoginPage';

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
    component: LoginPage,
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
