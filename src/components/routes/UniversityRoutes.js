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
    path: 'academicyears',
    label: 'years',
    component: UniversityAcademicYears,
  },
  {
    path: 'admin',
    label: 'admin',
    component: UniversityAdmin,
  },
];

export default UniversityRoutes;
