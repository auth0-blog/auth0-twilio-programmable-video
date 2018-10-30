import React from 'react';

function JoinConference(props) {
  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <h1>Secure Twilio Video Conferences</h1>
            <div className="form-group">
              <label htmlFor="exampleFormControlInput1">Enter a Video Call ID:</label>
              <input type="email" className="form-control" id="video-call-id"
                     onChange={props.updateVideoCallId}
                     value={props.videoCallId}
                     placeholder="e.g., my-video-call"/>
            </div>
            <button className="btn btn-primary mb-2"
                    onClick={props.joinConference}
                    disabled={!props.videoCallId.trim()}>
              Join Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinConference;
