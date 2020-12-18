import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import '@ionic/core/css/core.css'
import '@ionic/core/css/ionic.bundle.css'
 
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import {IonApp, IonPage} from '@ionic/react';

const App = () => (
  <Router>
	  <IonApp>
		    <IonPage>
		    <div>
		      <Navigation />
		 
		      <hr />
		 
		      <Route exact path={ROUTES.LANDING} component={LandingPage} />
		    </div>
		    </IonPage>
	  </IonApp>
  </Router>
);
 
export default withAuthentication(App);