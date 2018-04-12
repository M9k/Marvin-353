import React from 'react';
import FieldTypes from './custom/fieldtypes';
import Form from './custom/form';


function existValue(e) {
  if (e.length === 0) { return 2; }
  return 1;
}


// Home page component
const Home = () => (
  <div id="home">
    HOME
    {FieldTypes.TEXT}
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
        validateFunction: existValue,
      }, {
        name: 'surname',
        label: 'Surname:',
        help: 'insert his surname',
        placeholder: 'rossi',
        type: FieldTypes.TEXT,
        validateFunction: existValue,
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
