import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PageTableForm from '../template/PageTableForm';
import { creators as teacherExamSaga } from '../../sagas/TeacherExamSaga';


class TeacherExams extends React.Component {
  constructor(props) {
    super(props);
    this.getMyAssignedExamsAddr = this.getMyAssignedExamsAddr.bind(this);
  }

  getMyAssignedExamsAddr() {
    this.props.getMyAssignedExams(this.props.myWeb3Address);
  }

  render() {
    return (
      <div>
        <PageTableForm
          getTableData={this.getMyAssignedExamsAddr}
          tableData={this.props.assignedExams}
          headerInfo={['Name', 'credits', 'Name of the associated  course', 'year', 'details']}
          linkTableData
        />
      </div>
    );
  }
}

TeacherExams.propTypes = {
  getMyAssignedExams: PropTypes.func.isRequired,
  assignedExams: PropTypes.arrayOf(String).isRequired,
  myWeb3Address: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  assignedExams: state.teacherData.list,
  myWeb3Address: state.metamask.account,
});

function mapDispatchToProps(dispatch) {
  return {
    getMyAssignedExams: addr => (
      dispatch(teacherExamSaga.getList(addr))
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherExams);

