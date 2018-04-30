import React from 'react';
import Form from '../custom/Form';
import FieldTypes from '../custom/fieldtypes';
import Utils from '../custom/utils';
import PageTableForm from '../template/PageTableForm';

const unconfirmedTeachers = [
  {
    Address: '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
    Name: 'NTeacher1',
    Surname: 'CTeacher2',
  },
  {
    Address: '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
    Name: 'NTeacher2',
    Surname: 'CTeacher2',
  },
  {
    Address: '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
    Name: 'NTeacher3',
    Surname: 'CTeacher3',
  },
];

const ConfirmTeacher = () => (
  <div>
    <Form
      description="Confirm teacher account"
      fields={[{
        name: 'teacherAddress',
        label: 'Address:',
        help: 'insert the address of the teacher',
        placeholder: '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
        type: FieldTypes.TEXT,
        validateFunction: Utils.validEthAddress,
      }]}
      submitFunction={e => e}
    />
    <PageTableForm
      getTableData={e => e}
      tableData={unconfirmedTeachers}
      deleteMultiColumnRow={e => e}
      headerInfo={['Address', 'Name', 'Surname', 'Deny']}
    />
  </div>
);

export default ConfirmTeacher;
