import Index from '../student/Index'; // eslint-disable-line import/no-named-as-default
import StudentExam from '../student/StudentExam';
import OptionalExams from '../student/OptionalExams';

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
    component: OptionalExams,
  },
];

export default StudentRoutes;
