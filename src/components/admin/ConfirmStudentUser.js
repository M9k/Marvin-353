import React from 'react';
import Form from '../custom/Form';
import FieldTypes from '../custom/fieldtypes';
import Utils from '../custom/utils';
import PageTableForm from '../template/PageTableForm';

const unconfirmedStudent = [
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

const ConfirmStudent = () => (
  <div>
    <Form
      description="Confirm student account"
      fields={[{
        name: 'studentAddress',
        label: 'Address:',
        help: 'insert the address of the student',
        placeholder: '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
        type: FieldTypes.TEXT,
        validateFunction: Utils.validEthAddress,
      }]}
      submitFunction={e => e}
    />
    <PageTableForm
      getTableData={e => e}
      tableData={unconfirmedStudent}
      deleteMultiColumnRow={e => e}
      headerInfo={['Address', 'Name', 'Surname', 'Course', 'Deny']}
    />
  </div>
);

export default ConfirmStudent;
