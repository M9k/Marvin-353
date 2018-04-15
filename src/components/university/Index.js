import React from 'react';
import CardWithIcon from '../custom/CardWithIcon';

const Index = () => (
  <div>
    <h3 className="text-center">Welcome University Founder</h3>
    <img alt="" className="img-responsive imageIndexTop" src="/media/cards/adminIndex.png" />
    <CardWithIcon
      title="Admin"
      text="Manage all the admin of Marvin, add, modify or delete them"
      links={[{ path: 'admin', label: 'Click here to manage admin' }]}
    />
    <CardWithIcon
      title="Academic Year"
      text="Manage all the academic years of Marvin, add or delete them"
      links={[{ path: 'academicyears', label: 'Click here to manage years' }]}
    />
  </div>
);
export default Index;