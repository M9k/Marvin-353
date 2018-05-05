import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProgressBar from 'react-bootstrap/lib/ProgressBar';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import CardWithIcon from '../custom/CardWithIcon';
import { creators } from '../../sagas/StudentSaga';

class Index extends React.Component {
  componentWillMount() {
    this.props.getCredits(this.props.myAddress);
  }
  render() {
    return (
      <div>
        <Jumbotron>
          <h1>Welcome Student</h1>
          <p>
              Here you can enrol to your exams,
check how many credits you need to end and you can choose and add optional exams to your study plan.
          </p>
          <h5>Your total credits: {this.props.myCredits}</h5>
          <h5>Total credits need to end: {this.props.graduationCredits}</h5>
          <ProgressBar
            active
            bsStyle="success"
            now={(this.props.myCredits / this.props.graduationCredits) * 100}
          />
        </Jumbotron>
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
    );
  }
}
Index.propTypes = {
  myCredits: PropTypes.number,
  graduationCredits: PropTypes.number,
  getCredits: PropTypes.func,
  myAddress: PropTypes.string.isRequired,
};

Index.defaultProps = {
  getCredits: () => {},
  myCredits: 0,
  graduationCredits: 0,
};

const mapStateToProps = state => ({
  myCredits: state.student.credits,
  graduationCredits: state.student.graduationCredits,
  myAddress: state.user.data.contract,
});

function mapDispatchToProps(dispatch) {
  return {
    getCredits: add =>
      dispatch(creators.getCreditsAction(add)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
