import Index from '../public/Index';
import Help from '../public/Help';
import License from '../public/License';
import testPageTable from '../template/testPageTable';
import testForm from '../template/testForm';

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
    component: testPageTable,
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
