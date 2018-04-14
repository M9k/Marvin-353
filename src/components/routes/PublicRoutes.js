import Index from '../public/Index';
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
];

export default PublicRoutes;
