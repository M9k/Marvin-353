import React from 'react';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Button from 'react-bootstrap/lib/Button';
import CardWithIcon from '../custom/CardWithIcon';

const Index = () => (
  <div>
    <div>
      <Jumbotron>
        <h1>Welcome Teacher</h1>
        <p className="jumbotron-text">
          Here you can manage all your exams and students valutations.
          To know how much each operation costs please visit the price page.
        </p>
        <p>
          <Button bsStyle="primary" href="price">Price page</Button>
        </p>
      </Jumbotron>
    </div>
    <CardWithIcon
      title="Exams list"
      text="Show all my exams"
      image="teacherExams.png"
      links={[{ path: '/exams', label: 'Click here to see your exams' }]}
    />
  </div>
);

export default Index;
