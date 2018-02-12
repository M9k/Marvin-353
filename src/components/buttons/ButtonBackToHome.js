import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const USERHOME = {
  NONE: '/',
  STUDENT: '/homeStudent',
  PROFESSOR: '/homeProfessor',
  ADMIN: '/homeAdmin',
  UNIVERSITY: '/homeUniversity',
};

const ButtonBackToHome = props => (
  <Button link={USERHOME[props.user]}>
    Go back to home
  </Button>
);

ButtonBackToHome.propTypes = {
  user: PropTypes.oneOf(Object.keys(USERHOME)).isRequired,
};

export default ButtonBackToHome;
