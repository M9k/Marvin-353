import React from 'react';
import ProgressBar from 'react-bootstrap/lib/ProgressBar';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import CardWithIcon from '../custom/CardWithIcon';


const Index = () => (
  <div>
    <div>
      <Jumbotron>
        <h1>Welcome Student</h1>
        <p>
          Here you can enrol to your exams,
check how many credits you need to end and you can choose and add optional exams to your study plan.
        </p>
        <p>
          <h5>Your total credits: {120}</h5>
          <h5>Total credits need to end: {180}</h5>
          <ProgressBar active bsStyle="success" now={(120 / 180) * 100} />
        </p>
      </Jumbotron>

    </div>
    <div>
      <CardWithIcon
        title="Exams list"
        text="Show all my exams list"
        image="examsList.png"
        links={[{ path: '/exams', label: 'Click here to see your exams' }]}
      />
      <CardWithIcon
        title="Optional exams"
        text="Show all optional exams for my course"
        image="examsList.png"
        links={[{ path: '/optionalexams', label: 'Click here to see optional exams' }]}
      />
    </div>
  </div>
);

export default Index;
