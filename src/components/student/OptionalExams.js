import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PageTableForm from '../template/PageTableForm';
import { creators as studentExamSaga } from '../../sagas/StudentSaga';
import ModalForm from '../custom/ModalForm';

class OptionalExams extends React.Component {
  constructor(props) {
    super(props);
    this.getExams = this.getExams.bind(this);
    this.closeSelect = this.closeSelect.bind(this);
    this.viewSelect = this.viewSelect.bind(this);
    this.state = { select: false };
  }
  getExams() {
    this.props.getOptionalExams(this.props.myAddress);
  }
  viewSelect(item) {
    this.setState({ select: true, item });
  }

  closeSelect(item) {
    this.setState({ select: false });
    this.props.enrollToExam(item);
  }
  render() {
    return (
      <div>
        <PageTableForm
          getTableData={this.getExams}
          tableData={this.props.OptionalExams}
          headerInfo={['Name', 'Credits', 'Mandatory', 'TeacherName', 'TeacherSurname', 'Select optional exam']}
          columFilter
          tableButtons={[
            {
              buttonFunction: this.viewSelect,
              buttonText: 'Select ',
              buttonType: 'primary',
            },
            ]}
        />
        <ModalForm
          title="Confirmation teacher"
          yesFunction={this.closeSelect}
          keyForModal={{ item: this.state.item }}
          show={this.state.select}
        >
          <p>
            Are you sure you want to select this optional exam?
          </p>
        </ModalForm>
      </div>
    );
  }
}

OptionalExams.propTypes = {
  getOptionalExams: PropTypes.func.isRequired,
  enrollToExam: PropTypes.func.isRequired,
  OptionalExams: PropTypes.arrayOf(Object).isRequired,
  myAddress: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  OptionalExams: state.student.optionalExamsList,
  myAddress: state.user.contract,
});

function mapDispatchToProps(dispatch) {
  return {
    getOptionalExams: add =>
      dispatch(studentExamSaga.getOptionalExamsAction(add)),
    enrollToExam: (objArr) => {
      dispatch(studentExamSaga.enrollToExamAction(objArr.item.address));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OptionalExams);

