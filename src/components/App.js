import React from 'react';
import PropTypes from 'prop-types';

// app component
export default class App extends React.Component {
  // render
  render() {
    return (
      <div className="container">
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.string.isRequired,
};
