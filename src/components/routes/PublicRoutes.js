import Index from '../public/Index';
import Help from '../public/Help';
import testPageTable from '../template/testPageTable';
import testForm from '../template/testForm';

const PublicRoutes = [
  {
    path: '/',
    label: '/',
    component: Index,
  },
  {
    path: 'test',
    label: 'PageTableForm test',
    component: testPageTable,
  },
  {
    path: 'forms',
    label: 'Form test',
    component: testForm,
  },
  {
    path: 'help',
    label: 'Help',
    component: Help,
  },
];

export default PublicRoutes;
