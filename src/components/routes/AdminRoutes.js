import Index from '../admin/Index';
import AdminCourseExams from '../admin/AdminCourseExams';
import AdminCourses from '../admin/AdminCourses';

const AdminRoutes = [
  {
    path: '/',
    label: '/',
    position: 'none',
    component: Index,
  },
  {
    path: '/courses/:examid',
    label: 'Course exam',
    position: 'none',
    component: AdminCourseExams,
  },
  {
    path: '/courses',
    label: 'Courses',
    position: 'left',
    component: AdminCourses,
  },
];

export default AdminRoutes;
