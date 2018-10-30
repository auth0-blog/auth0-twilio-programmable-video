# coding=utf-8

from flask import Flask, jsonify, _request_ctx_stack
from twilio.jwt.access_token import AccessToken
from twilio.jwt.access_token.grants import VideoGrant
from flask_cors import CORS
from .auth import AuthError, requires_auth

# creating the Flask application
app = Flask(__name__)
CORS(app)


@app.route('/conference-token/<string:room_name>')
@requires_auth
def token(room_name):
    # get credentials for environment variables
    account_sid = '--'
    api_key = '--'
    api_secret = '--'

    # Create an Access Token
    token = AccessToken(account_sid, api_key, api_secret)

    # Set the Identity of this token
    print(_request_ctx_stack.top.current_user['sub'])
    token.identity = _request_ctx_stack.top.current_user['sub']

    # Grant access to Video
    grant = VideoGrant()
    grant.room = room_name
    token.add_grant(grant)

    # Return token info as JSON
    return jsonify(identity=token.identity, token=token.to_jwt().decode('UTF-8'))


@app.errorhandler(AuthError)
def handle_auth_error(ex):
    response = jsonify(ex.error)
    response.status_code = ex.status_code
    return response
