import { Route, IndexRoute } from 'react-router';
import React from 'react';

import App from '../university/App';
import Home from '../university/Home';
import UniversityAcademicYears from '../university/UniversityAcademicYears';
import UniversityAdmin from '../university/UniversityAdmin';


const UniversityRoutes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="academicyears" component={UniversityAcademicYears} />
    <Route path="admin" component={UniversityAdmin} />
    <Route path="*" component={Home} />
  </Route>
);
export default UniversityRoutes;
