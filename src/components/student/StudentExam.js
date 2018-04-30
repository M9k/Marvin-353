import React from 'react';
// import PropTypes from 'prop-types';
import PageTableForm from '../template/PageTableForm';

class StudentExam extends React.Component {
  constructor(props) {
    super(props);
    this.examList = [
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
          tableData={this.examList}
          headerInfo={['Name', 'Credits', 'Mandatory', 'Vote']}
        />
      </div>
    );
  }
}
StudentExam.propTypes = {
  // getExams: PropTypes.func.isRequired,
  // examList: PropTypes.arrayOf(Object).isRequired,
};

export default StudentExam;
