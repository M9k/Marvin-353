import Index from '../teacher/Index';
import TeacherExams from '../teacher/TeacherExams';
import TeacherExamStudents from '../teacher/TeacherExamStudents';

const TeacherRoutes = [
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
    component: TeacherExams,
  },
  {
    path: '/exams/:examid',
    label: 'Exams attendances',
    position: 'none',
    component: TeacherExamStudents,
  },
];

export default TeacherRoutes;
