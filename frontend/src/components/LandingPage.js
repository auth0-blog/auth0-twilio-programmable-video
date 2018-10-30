import React from 'react';
import auth0Client from '../Auth';

function LandingPage() {
  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <h1>Secure Twilio Video Conferences</h1>
            <p>Howdy, visitor! To use this app, you will have to sign in first.</p>
            <button className="btn btn-primary mb-2" onClick={auth0Client.signIn}>Sign In</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
