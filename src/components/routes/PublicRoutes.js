import Index from '../public/Index';
import Register from '../public/Register';
import LoginPage from '../public/LoginPage';
import Student from '../student/Index';
import OptionalExams from '../student/OptionalExams';
import Exams from '../student/StudentExam';

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
    path: 'student',
    label: 'ProvaStudent1',
    position: 'right',
    component: Student,
  },
  {
    path: 'optionalExams',
    label: 'ProvaStudent2',
    position: 'right',
    component: OptionalExams,
  },
  {
    path: 'Exams',
    label: 'ProvaStudent3',
    position: 'right',
    component: Exams,
  },
];

export default PublicRoutes;
