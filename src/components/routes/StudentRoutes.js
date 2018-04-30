import Index from '../student/Index';
import StudentExam from '../student/StudentExam';

const StudentRoutes = [
  {
    path: '/',
    label: '/',
    position: 'none',
    component: Index,
  },
  {
    path: '/exams',
    label: 'Exams',
    position: 'left',
    component: StudentExam,
  },
];

export default StudentRoutes;
