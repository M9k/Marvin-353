import React from 'react';
import PropTypes from 'prop-types';

class AdminCourseExams extends React.Component {
  constructor(props) {
    super(props);
    this.params = this.props.params;
  }

  componentDidMount() {
    console.log(this.params.examid);
  }

  render() {
    console.log('ADMIN COURSE EXAM');
    return (
      <div>
        <h3 className="text-center">Admin course exam with id {this.params.examid}</h3>
      </div>
    );
  }
}

AdminCourseExams.propTypes = {
  params: PropTypes.string.isRequired,
};

export default AdminCourseExams;
