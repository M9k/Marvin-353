import Index from '../admin/Index';
import AdminCourseExams from '../admin/AdminCourseExams';
import AdminCourses from '../admin/AdminCourses';
import ConfirmStudents from '../admin/ConfirmStudentUser';
import ConfirmTeachers from '../admin/ConfirmTeacherUser';
import AdminExams from '../admin/AdminExams';
import SystemUsers from '../admin/SystemUsers';

const AdminRoutes = [
  {
    path: '/',
    label: '/',
    position: 'none',
    component: Index,
  },
  {
    path: '/confirmStudents',
    label: 'Confirm Students',
    position: 'left',
    component: ConfirmStudents,
  },
  {
    path: '/confirmTeachers',
    label: 'Confirm Teachers',
    position: 'left',
    component: ConfirmTeachers,
  },
  {
    path: '/systemUsers',
    label: 'Manage Users',
    position: 'left',
    component: SystemUsers,
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
  {
    path: '/exams',
    label: 'Exams',
    position: 'left',
    component: AdminExams,
  },
];

export default AdminRoutes;
