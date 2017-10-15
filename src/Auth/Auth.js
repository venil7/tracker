import auth0 from 'auth0-js';
import history from '../history';

class Auth {
  auth0 = new auth0.WebAuth({
    domain: process.env.REACT_APP_DOMAIN,
    clientID: process.env.REACT_APP_CLIENT_ID,
    redirectUri: process.env.REACT_APP_REDIRECT_URI,
    audience: process.env.REACT_APP_AUDIENCE,
    responseType: 'token id_token',
    scope: 'openid email profile api'
  });

  handleAuthentication(): boolean {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        return true;
      } else if (err) {
        history.replace('/');
      }
      return false;
    });
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    history.replace('/');
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/');
  }

  getAccessToken() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  }

  getProfile(callback) {
    const accessToken = this.getAccessToken();
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      callback(err, profile);
    });
  }

  get userProfile() {
    return this.isAuthenticated()
      ? JSON.parse(localStorage.getItem('userProfile'))
      : null;
  }

  set userProfile(userProfile) {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }

  login() {
    this.auth0.authorize();
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
export { Auth };
export default new Auth();
