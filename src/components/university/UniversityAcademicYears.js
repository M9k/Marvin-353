import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FieldTypes from '../custom/fieldtypes';
import Utils from '../custom/utils';
import Form from '../custom/Form';
import { creators as universitySagaAction } from '../../sagas/ManageYearsSaga';
import PageTableForm from '../template/PageTableForm';
import ModalForm from '../custom/ModalForm';

class UniversityAcademic extends React.Component {
  constructor(props) {
    super(props);
    this.viewDelete = this.viewDelete.bind(this);
    this.notDelete = this.notDelete.bind(this);
    this.closeDelete = this.closeDelete.bind(this);
    this.state = { delete: false };
  }

  viewDelete(item) {
    this.setState({ delete: true, item });
  }

  notDelete() {
    this.setState({ delete: false });
  }

  closeDelete(objArr) {
    this.setState({ delete: false });
    this.props.deleteYears(objArr.item.year);
  }
  render() {
    return (
      <div>
        <Form
          description="Do you want to add a new academic year?"
          fields={[{
            name: 'year',
            label: 'Year:',
            help: 'insert the new university year',
            placeholder: '20xx',
            type: FieldTypes.TEXT,
            validateFunction: Utils.moreThanCurrentYear,
          }]}
          submitFunction={this.props.addYear}
        />

        <PageTableForm
          getTableData={this.props.getYears}
          tableData={this.props.academicYears}
          headerInfo={['Year', 'Delete']}
          tableButtons={[{
            buttonFunction: this.viewDelete,
            buttonText: 'Delete',
            buttonType: 'danger',
          }]}
        />
        <ModalForm
          title="Delete admin"
          yesFunction={this.closeDelete}
          noFunction={this.notDelete}
          keyForModal={{ item: { year: this.state.item } }}
          show={this.state.delete}
        >
          <p>
            Are you sure you want to delete this academic year?
          </p>
        </ModalForm>
      </div>
    );
  }
}


UniversityAcademic.propTypes = {
  addYear: PropTypes.func.isRequired,
  getYears: PropTypes.func.isRequired,
  deleteYears: PropTypes.func.isRequired,
  academicYears: PropTypes.arrayOf(String).isRequired,
};

const mapStateToProps = state => ({
  academicYears: state.manageYears.accademicYears,
});

function mapDispatchToProps(dispatch) {
  return {
    addYear: objArr => (
      dispatch(universitySagaAction.addYear(objArr.year.value))
    ),
    getYears: () => dispatch(universitySagaAction.getAllYears()),
    deleteYears: year => dispatch(universitySagaAction.removeEmptyYear(year)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UniversityAcademic);
