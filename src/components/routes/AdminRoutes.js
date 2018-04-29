import Index from '../admin/Index';
import AdminCourseExams from '../admin/AdminCourseExams';
import AdminCourses from '../admin/AdminCourses';
import ConfirmStudents from '../admin/ConfirmStudentUser';
import ConfirmTeachers from '../admin/ConfirmTeacherUser';
import AdminExams from '../admin/AdminExams';

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
