import React from 'react';
import PropTypes from 'prop-types';

// app component
const App = props => (
  <div>
    {props.children}
  </div>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
