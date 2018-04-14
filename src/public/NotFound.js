import React from 'react';
import PageContainer from '../components/PageContainer';

// Not found page component
const NotFound = () => {
  document.title = 'Not Found! - Marvin';
  return (
    <PageContainer>
      <h1>Page not found!</h1>
    </PageContainer>
  );
};

export default NotFound;
