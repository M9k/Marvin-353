import React from 'react';
import FieldTypes from '../custom/fieldtypes';
import Form from '../custom/form';

function existValue(e) {
  if (e.length === 0) { return 2; }
  return 1;
}

// Home page component
const testForm = () => (
  <div id="home">
    FORMS
    {FieldTypes.TEXT}
    <Form />
    <Form description="FAKE Add new admin address form" />
    <Form
      description="REAL Add new admin address form"
      fields={[{
      name: 'addressAdmin',
      label: 'Address:',
      help: 'insert the address of the admin',
      placeholder: '0xwxwxw0w40443xwxxwff',
      type: FieldTypes.TEXT,
      validateFunction: (ind) => {
        if (ind.length === 0) {
        return 2;
      }
        if (!/^(0x)[0-9a-f]{40}$/i.test(ind) || !web3.isAddress(ind)) {
        return 0;
      }
        return 1;
      },
      }]}
    />
    <Form
      description="Do you want to be part of Marvin University?"
      fields={[{
        name: 'name',
        label: 'Name:',
        help: 'insert your name',
        placeholder: 'luigi',
        type: FieldTypes.TEXT,
        validateFunction: existValue,
      }, {
        name: 'surname',
        label: 'Surname:',
        help: 'insert your surname',
        placeholder: 'rossi',
        type: FieldTypes.TEXT,
        validateFunction: existValue,
      }, {
        name: 'userType',
        label: 'Role:',
        help: 'insert your desired role',
        type: FieldTypes.SELECT,
        values: ['student', 'teacher'],
        validateFunction: (e) => { if (e !== '') return 1; return 2; },
      }]}
    />


    <Form
      description="Do you want to add a new year?"
      fields={[{
        name: 'year',
        label: 'Year:',
        help: 'insert the new university year',
        placeholder: '20xx',
        type: FieldTypes.TEXT,
        validateFunction: (e) => { if (e !== '') { if (e >= (new Date()).getFullYear()) return 1; return 0; } return 2; },
      }]}
    />

    <Form
      description="What's the grade of the student?"
      fields={[{
        name: 'grade',
        label: 'Grade:',
        help: 'insert the student grade',
        placeholder: '25',
        type: FieldTypes.TEXT,
        validateFunction: (e) => { if (e !== '') { if (e >= 0 && e <= 31) return 1; return 0; } return 2; },
      }]}
    />

    <Form
      description="Describe the exam that you want to add"
      fields={[{
        name: 'nameExam',
        label: 'Name of the exam/course:',
        help: 'course name',
        placeholder: 'P1',
        type: FieldTypes.TEXT,
        validateFunction: existValue,
      },
        {
        name: 'yearExam',
        label: 'Academic Year:',
        help: 'insert the associated year',
        type: FieldTypes.SELECT,
        values: ['2017', '2018', '2019'],
        validateFunction: (e) => { if (e !== '') return 1; return 2; },
      },
        {
          name: 'optionalExam',
          label: 'Optional:',
          help: 'is the exam optional',
          type: FieldTypes.CHECKBOX,
          values: ['yes'],
          validateFunction: e => (1 || e),
        },
      ]}
    />

    <Form
      description="What's the optional exam you want to add to your program?"
      fields={[{
        name: 'examExtra',
        label: 'Exam:',
        help: 'choose the optional exam',
        placeholder: 'easy exam',
        type: FieldTypes.SELECT,
        values: ['P1', 'P2', 'P3', 'SWE', 'RO', 'TECWEB'],
        validateFunction: (e) => { if (e !== '') return 1; return 2; },
      }]}
    />

  </div>
);

export default testForm;
