import Index from '../student/Index';
import StudentExam from '../student/StudentExam';
import OptionalExasm from '../student/OptionalExams';

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
  {
    path: '/optionalexams',
    label: 'Optional Exams',
    position: 'left',
    component: OptionalExasm,
  },
];

export default StudentRoutes;
