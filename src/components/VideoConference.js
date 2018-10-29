import React, {Component} from 'react';
import { connect } from 'twilio-video';

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
      const room = await connect('$TOKEN', { name: this.props.videoCallId });
      room.on('participantConnected', () => {
        this.setState({
          message: `Successfully joined a Room: ${room}`,
        });
      });
    } catch (error) {
      this.setState({
        message: error.message,
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.message}
      </div>
    );
  }
}

export default VideoConference;
