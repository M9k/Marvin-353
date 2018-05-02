import React from 'react';
// import PropTypes from 'prop-types';
import PageTableForm from '../template/PageTableForm';

class OptionalExams extends React.Component {
  constructor(props) {
    super(props);
    this.examList = [
      {
        name: 'Programming',
        credits: '10',
      },
      {
        name: 'Logic',
        credits: '6',
      },
      {
        name: 'Database',
        credits: '9',
      },
      {
        name: 'Computer architecture',
        credits: '8',
      },
    ];
  }
  render() {
    return (
      <div>
        <PageTableForm
          getTableData={e => e}
          tableData={this.examList}
          headerInfo={['Name', 'Credits', 'Add to study plan']}
          tableButtons={[
            {
              buttonFunction: e => e,
              buttonText: 'ADD',
              buttonType: 'primary',
            },
          ]}
        />
      </div>
    );
  }
}
OptionalExams.propTypes = {
  // getExams: PropTypes.func.isRequired,
  // examList: PropTypes.arrayOf(Object).isRequired,
};

export default OptionalExams;
