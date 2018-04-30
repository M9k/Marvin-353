import React from 'react';
import CardWithIcon from '../custom/CardWithIcon';

const Index = () => (
  <div>
    <h3 className="text-center">Welcome Admin</h3>
    <img alt="" className="img-responsive imageIndexTop" src="/media/cards/adminIndex.png" />
    <CardWithIcon
      title="Confirm teacher accounts"
      text="Confirm pending unconfirmed users for teacher role."
      image="confirm.png"
      links={[{ path: '/confirmTeachers', label: 'Click here to confirm' }]}
    />
    <CardWithIcon
      title="Confirm student accounts"
      text="Confirm pending unconfirmed users for student role."
      image="confirm.png"
      links={[{ path: '/confirmStudents', label: 'Click here to confirm' }]}
    />
    <CardWithIcon
      title="Manage Users"
      text="Manage all teacher accounts present in the University"
      image="manageAdmin.png"
      links={[{ path: '/systemUsers', label: 'Click here to manage' }]}
    />

    <CardWithIcon
      title="Manage courses"
      text="Manage all course present in the University"
      image="manageAdmin.png"
      links={[{ path: '/courses', label: 'Click here to manage' }]}
    />
    <CardWithIcon
      title="Exams"
      text="View all exams present in the University"
      image="manageAdmin.png"
      links={[{ path: '/exams', label: 'Click here to view' }]}
    />
  </div>
);
export default Index;
