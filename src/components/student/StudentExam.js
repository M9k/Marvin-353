import React from 'react';
import PageTableForm from '../template/PageTableForm';

class StudentExam extends React.Component {
  constructor(props) {
    super(props);
    this.subscribedExamList = [
      {
        name: 'Programming',
        credits: '10',
        mandatory: true,
        vote: '30',
      },
      {
        name: 'Logic',
        credits: '6',
        mandatory: false,
        vote: '23',
      },
      {
        name: 'Database',
        credits: '9',
        mandatory: true,
        vote: '',
      },
      {
        name: 'Computer architecture',
        credits: '8',
        mandatory: false,
        vote: '29',
      },
    ];
  }
  render() {
    return (
      <div>
        <PageTableForm
          getTableData={e => e}
          tableData={this.subscribedExamList}
          headerInfo={['Name', 'Credits', 'Mandatory', 'Vote']}
        />
      </div>
    );
  }
}

export default StudentExam;
