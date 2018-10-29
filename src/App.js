import React, {Component} from 'react';

class App extends Component {
  render() {
    return (
      <div id="main-container" className="d-flex align-items-center bg-secondary">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div class="card">
                <div className="card-body">
                  <h1>Secure Twilio Video Conferences</h1>
                  <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Enter a Video Call ID:</label>
                    <input type="email" className="form-control" id="video-call-id"
                           placeholder="my-video-call"/>
                  </div>
                  <button type="submit" className="btn btn-primary mb-2">Join Call</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
