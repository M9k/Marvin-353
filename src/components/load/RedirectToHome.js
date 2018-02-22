import React from 'react';
import PropTypes from 'prop-types';

class RedirectToHome extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {window.location.replace('/')}, this.props.time);
  }
  render() {
    return(
      <div>Logged! If you are not redirect to the homepage in {Math.round(this.props.time/1000) + 3} seconds <a href="/">click here</a></div>
    );
  }
}
RedirectToHome.propTypes = {
  time: PropTypes.number
};
RedirectToHome.defaultProps = {
  time: 1000
};
export default RedirectToHome;
