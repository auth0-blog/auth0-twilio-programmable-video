import React from 'react';
import {Route, withRouter} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import withSplashScreen from './components/withSplashScreen';

function App() {
  return (
    <div id="main-container" className="d-flex align-items-center bg-secondary">
      <div className="container">
        <Route exact path="/" component={LandingPage}/>
      </div>
    </div>
  );
}

export default withRouter(withSplashScreen(App));
