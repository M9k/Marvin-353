import React from 'react';
import PageTableForm from '../template/PageTableForm';

const Students = [
  {
    Address: '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
    Name: 'NStudente1',
    Surname: 'CStudente1',
    Course: 'Computer Science',
  },
  {
    Address: '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
    Name: 'NStudente2',
    Surname: 'CStudente2',
    Course: 'Computer Science',
  },
  {
    Address: '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
    Name: 'NStudente3',
    Surname: 'CStudente3',
    Course: 'Computer Science',
  },
];
const teachers = [
  {
    Address: '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
    Name: 'NStudente1',
    Surname: 'CStudente1',
  },
  {
    Address: '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
    Name: 'NStudente2',
    Surname: 'CStudente2',
  },
  {
    Address: '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
    Name: 'NStudente3',
    Surname: 'CStudente3',
  },
];

const SystemUsers = () => (
  <div>
    <h4>List of all students:</h4>
    <PageTableForm
      getTableData={e => e}
      tableData={Students}
      deleteMultiColumnRow={e => e}
      headerInfo={['Address', 'Name', 'Surname', 'Course', 'Remove']}
    />
    <h4>List of all teachers:</h4>
    <PageTableForm
      getTableData={e => e}
      tableData={teachers}
      deleteMultiColumnRow={e => e}
      headerInfo={['Address', 'Name', 'Surname', 'Remove']}
    />
  </div>
);

export default SystemUsers;
