import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from '../Navigation';
import LandingPage from '../Landing';
 
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
 
const App = () => (
  <Router>
    <div>
      <Navigation />
 
      <hr />
 
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
    </div>
  </Router>
);
 
export default withAuthentication(App);