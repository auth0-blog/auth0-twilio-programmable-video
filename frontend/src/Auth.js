import auth0 from 'auth0-js';

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      // the following three lines MUST be updated
      domain: 'blog-samples.auth0.com',
      audience: 'http://localhost:5000/conference-token',
      clientID: '4IdhGjfMuh2cNSemwuu2BEzhsOF80L5q',
      redirectUri: 'http://localhost:3000',
      responseType: 'token id_token',
      scope: 'openid profile'
    });

    this.getProfile = this.getProfile.bind(this);
    this.loadSession = this.loadSession.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  getAccessToken() {
    return this.accessToken;
  }

  getProfile() {
    return this.profile;
  }

  getIdToken() {
    return this.idToken;
  }

  isAuthenticated() {
    return new Date().getTime() < this.expiresAt;
  }

  loadSession() {
    return new Promise((resolve, reject) => {
      // not returning from Auth0 (no hash)
      if (!window.location.hash) {
        this.auth0.checkSession({}, (err, authResult) => {
          if (err) return reject(err);
          if (!authResult || !authResult.idToken || !authResult.accessToken) {
            return resolve(false);
          }
          this.setSession(authResult);
          resolve(true);
        });
        return;
      }

      // returning from Auth0
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        this.setSession(authResult);
        resolve(true);
      });
    })
  }

  setSession(authResult) {
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.profile = authResult.idTokenPayload;
    // set the time that the id token will expire at
    this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
  }

  signIn() {
    this.auth0.authorize();
  }

  signOut() {
    // clear id token, profile, and expiration
    this.accessToken = null;
    this.idToken = null;
    this.profile = null;
    this.expiresAt = null;
  }
}

const auth0Client = new Auth();

export default auth0Client;
