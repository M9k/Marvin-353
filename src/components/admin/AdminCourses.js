import React from 'react';
import { Link } from 'react-router';

const AdminCourses = () => {
  const courses = [
    {
      name: 'Course 0',
      index: '0',
    },
    {
      name: 'Course 1',
      index: '1',
    },
  ];
  const links = [];
  for (let i = 0; i < courses.length; i += 1) {
    links.push(<li><Link href={`/courses/${courses[i].index}`}>Go to {courses[i].name}</Link></li>);
  }
  return (
    <div>
      <h3 className="text-center">Admin courses</h3>
      <ul>
        {links}
      </ul>
    </div>
  );
};

export default AdminCourses;

