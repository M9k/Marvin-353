import React from 'react';
import CardWithIcon from '../custom/CardWithIcon';

const Index = () => (
  <div>
    <h3 className="text-center">Welcome Teacher</h3>
    <CardWithIcon
      title="Exams list"
      text="Show all my exams"
      image="teacherExams.png"
      links={[{ path: '/exams', label: 'Click here to see your exams' }]}
    />
  </div>
);

export default Index;
