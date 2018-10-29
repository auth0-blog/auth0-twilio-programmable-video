# coding=utf-8

from flask import Flask, jsonify
from twilio.jwt.access_token import AccessToken
from twilio.jwt.access_token.grants import VideoGrant

# creating the Flask application
app = Flask(__name__)


@app.route('/exams/<string:room_name>')
def token(room_name):
    # get credentials for environment variables
    account_sid = 'AC7a138c5f3b84adb7c1ac85a19a974e08'
    api_key = 'SKdadecf1f9e6ce34a94359387c33f2327'
    api_secret = 'jIEbwO88bCy5TZOXaO7XpcMkvrV7fI2v'

    # Create an Access Token
    token = AccessToken(account_sid, api_key, api_secret)

    # Set the Identity of this token
    token.identity = "testing"

    # Grant access to Video
    grant = VideoGrant()
    grant.room = room_name
    token.add_grant(grant)

    # Return token info as JSON
    return jsonify(identity=token.identity, token=token.to_jwt().decode('UTF-8'))
