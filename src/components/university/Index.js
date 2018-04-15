import React from 'react';
import CardWithIcon from '../custom/CardWithIcon';

const Index = () => (
  <div>
    <CardWithIcon
      title="Admin"
      text="Manage all the admin of Marvin, add, modify or delete them"
      links={[{ path: 'admin', label: 'Click here to manage admin' }]}
    />
    <CardWithIcon
      title="Academic Year"
      text="Manage all the academic years of Marvin, add or delete them"
      links={[{ path: 'years', label: 'Click here to manage years' }]}
    />
  </div>
);
export default Index;
