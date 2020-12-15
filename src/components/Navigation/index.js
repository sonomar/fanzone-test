import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
 
const Navigation = () => (
  <div>    
    <NavigationNonAuth />
  </div>
);
 
const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
  </ul>
);
 
export default Navigation;