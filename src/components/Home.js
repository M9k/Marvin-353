import React from 'react';
import FieldTypes from './custom/fieldtypes';
import Field from './custom/field';
// Home page component
const Home = () => (
  <div id="home">
    HOME
    {FieldTypes.TEXT}
    <Field />
  </div>
);


export default (Home);
