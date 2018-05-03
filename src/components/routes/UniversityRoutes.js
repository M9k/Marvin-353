import Index from '../university/Index';
import UniversityAcademicYears from '../university/UniversityAcademicYears';
import UniversityAdmin from '../university/UniversityAdmin';

const UniversityRoutes = [
  {
    path: '/',
    label: '/',
    component: Index,
  },
  {
    path: 'admin',
    label: 'Admin',
    position: 'left',
    component: UniversityAdmin,
  },
  {
    path: 'academicyears',
    label: 'Years',
    position: 'left',
    component: UniversityAcademicYears,
  },
];

export default UniversityRoutes;
