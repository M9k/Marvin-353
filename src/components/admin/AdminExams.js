import React from 'react';
import PageTableForm from '../template/PageTableForm';

const examList = [
  {
    name: 'Programming',
    credits: '10',
    course: 'L-16',
    teacher_surname: 'Filè',
    teacher_name: 'Gilberto',
  },
  {
    name: 'Database',
    credits: '9',
    course: 'L-16',
    teacher_surname: 'Conti',
    teacher_name: 'Mauro',
  },
];

const AdminExams = () => (
  <div>
    <PageTableForm
      getTableData={e => e}
      tableData={examList}
      headerInfo={['Name', 'Credits', 'Course', 'Teacher surname', 'Teacher name', 'Details']}
      detailTableData={true} // eslint-disable-line
    />
  </div>
);

export default AdminExams;
