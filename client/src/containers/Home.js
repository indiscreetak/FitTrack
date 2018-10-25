import React from 'react';
import { Link } from 'react-router-dom';

const home = () => (
  <div>
    <h1 className="title is-5">Success</h1>
    <Link to="/login">Login</Link>
  </div>
);

export default home;
