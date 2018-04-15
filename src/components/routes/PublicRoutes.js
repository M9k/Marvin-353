import Index from '../public/Index';
import Help from '../public/Help';
import License from '../public/License';
import testForm from '../template/testForm';
import login from '../../containers/Login';

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
    component: testForm,
  },
  {
    path: 'help',
    label: 'Help',
    position: 'right',
    component: Help,
  },
  {
    path: 'price',
    label: 'Price',
    position: 'right',
    component: testForm,
  },
  {
    path: 'license',
    label: 'License',
    position: 'none',
    component: License,
  },
];

export default PublicRoutes;
