import React, {Component} from 'react';
import {connect, createLocalVideoTrack} from 'twilio-video';

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2Q0OGRjMzc2YzFkYTMzY2U0ODA4NTUxNWRhMWQ4MzA0LTE1NDA4NDU3NTUiLCJpc3MiOiJTS2Q0OGRjMzc2YzFkYTMzY2U0ODA4NTUxNWRhMWQ4MzA0Iiwic3ViIjoiQUM3YTEzOGM1ZjNiODRhZGI3YzFhYzg1YTE5YTk3NGUwOCIsImV4cCI6MTU0MDg0OTM1NSwiZ3JhbnRzIjp7ImlkZW50aXR5IjoicmVhY3QtYXBwIiwidmlkZW8iOnt9fX0.XqdXcELEDjXX8B6txQnz5WuL39kvaVj-wNjub3FhSnQ';

class VideoConference extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Loading ...',
    }
  }

  async componentDidMount() {
    console.log(this.props.videoCallId);
    try {
      const room = await connect(token, {name: this.props.videoCallId});
      room.on('participantConnected', participant => {
        console.log('joined', participant);
      });

      const track = await createLocalVideoTrack();
      const localMediaContainer = document.getElementById('local-video');
      localMediaContainer.appendChild(track.attach());
      this.setState({
        message: `Joined Room: ${room.name}`,
      });
    } catch (error) {
      console.log('error.message', error.message);
      this.setState({
        message: error.message,
      });
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <h1 className="text-white">{this.state.message}</h1>
        </div>
        <div className="col-6">
          <div id="local-video" />
        </div>
      </div>
    );
  }
}

export default VideoConference;
