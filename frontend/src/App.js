import React from 'react';
import {Route, withRouter} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import VideoConference from './components/VideoConference';
import withSplashScreen from './components/withSplashScreen';
import ProtectRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div id="main-container" className="d-flex align-items-center bg-secondary">
      <div className="container">
        <Route exact path="/" component={LandingPage}/>
        <ProtectRoute exact path="/video-conference/:conferenceId" component={VideoConference}/>
      </div>
    </div>
  );
}

export default withRouter(withSplashScreen(App));
