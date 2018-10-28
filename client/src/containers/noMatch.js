import React from 'react';
import { Link } from 'react-router-dom';

const noMatch = () => (
  <div>
    <h1 className="title is-5">404 - Page Not Found</h1>
    <Link to="/">Go Back to Home</Link>
  </div>
);

export default noMatch;
