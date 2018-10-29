import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import VideoConference from './components/VideoConference';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videoCallId: '',
    };

    this.updateVideoCallId = this.updateVideoCallId.bind(this);
    this.joinConference = this.joinConference.bind(this);
  }

  joinConference() {
    this.props.history.push('/video-conference');
  }

  updateVideoCallId(event) {
    this.setState({
      videoCallId: event.target.value.trim(),
    });
  }

  render() {
    return (
      <div id="main-container" className="d-flex align-items-center bg-secondary">
        <div className="container">
          <Route path="/" exact render={() => (
            <LandingPage
              videoCallId={this.state.videoCallId}
              joinConference={this.joinConference}
              updateVideoCallId={this.updateVideoCallId}/>
          )}/>
          <Route path="/video-conference" render={() => (
            <VideoConference videoCallId={this.state.videoCallId}/>
          )}/>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
