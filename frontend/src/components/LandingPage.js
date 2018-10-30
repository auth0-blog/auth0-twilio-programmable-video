import React, {Component} from 'react';
import auth0Client from '../Auth';
import JoinConference from './JoinConference';
import LoginPage from './LoginPage';

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videoCallId: '',
    };

    this.updateVideoCallId = this.updateVideoCallId.bind(this);
    this.joinConference = this.joinConference.bind(this);
  }

  joinConference() {
    this.props.history.push('/video-conference/' + this.state.videoCallId);
  }

  updateVideoCallId(event) {
    this.setState({
      videoCallId: event.target.value.trim(),
    });
  }

  render() {
    if (!auth0Client.isAuthenticated()) return <LoginPage/>;

    return (
      <JoinConference
        videoCallId={this.state.videoCallId}
        joinConference={this.joinConference}
        updateVideoCallId={this.updateVideoCallId}/>
    );
  }
}

export default LandingPage;
