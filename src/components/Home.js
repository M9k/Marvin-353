import React from 'react';
import FieldTypes from './custom/fieldtypes';
import Field from './custom/field';
import Form from './custom/form';
// Home page component
const Home = () => (
  <div id="home">
    HOME
    {FieldTypes.TEXT}
    <Field />
    <hr />
    <Field name="name" label="Name:" help="insert your name" placeholder="my name is" type={FieldTypes.TEXT} validateFunction={e => (e.length >= 10)} />
    <hr />
    <Field name="role" label="What's your role?" type={FieldTypes.RADIO} values={['student', 'teacher']} />
    <hr />
    <Field name="newsletter" label="Which newsletters do you want?" type={FieldTypes.CHECKBOX} values={['Exams', 'Events', 'Holidays']} />
    <hr />
    <Field name="role" label="What's your role?" type={FieldTypes.SELECT} values={['student', 'teacher']} validateFunction={e => (e !== '')} />
    <hr />
    <Form />
    <Form description="FAKE Add new admin address form" />
    <Form
      description="REAL Add new admin address form"
      fields={[{
        name: 'name',
        label: 'Name:',
        help: 'insert his name',
        placeholder: 'luigi',
        type: FieldTypes.TEXT,
      }, {
        name: 'surname',
        label: 'Surname:',
        help: 'insert his surname',
        placeholder: 'rossi',
        type: FieldTypes.TEXT,
      }, {
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

  </div>
);


export default (Home);
