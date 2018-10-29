import React, {Component} from 'react';
import {connect, createLocalVideoTrack} from 'twilio-video';

// TODO get access token from a secure backend
const token = 'some-access-token';

class VideoConference extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Loading ...',
    }
  }

  async componentDidMount() {
    console.log(this.props.videoCallId);
    try {
      const room = await connect(token, {name: this.props.videoCallId});
      room.on('participantConnected', participant => {
        console.log(`Participant "${participant.identity}" connected`);

        participant.tracks.forEach(publication => {
          if (publication.isSubscribed) {
            const track = publication.track;
            document.getElementById('remote-media-div').appendChild(track.attach());
          }
        });

        participant.on('trackSubscribed', track => {
          document.getElementById('remote-media-div').appendChild(track.attach());
        });
      });

      const track = await createLocalVideoTrack();
      const localMediaContainer = document.getElementById('local-video');
      localMediaContainer.appendChild(track.attach());
      this.setState({
        title: `Joined Room: ${room.name}`,
      });
    } catch (error) {
      this.setState({
        title: error.message,
      });
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <h1 className="text-white">{this.state.title}</h1>
        </div>
        <div className="col-6">
          <div id="local-video" />
        </div>
        <div className="col-6">
          <div id="remote-media-div" />
        </div>
      </div>
    );
  }
}

export default VideoConference;
