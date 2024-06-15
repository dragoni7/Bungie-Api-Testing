import axios from 'axios';
import store from './LocalStorageService';

export default function(apiKey) {

  return store.get('D2LC::Authorization').then(localStorageAuth => {
    if (window.location.href.indexOf('authorize') > -1) {
      const authCode = new URLSearchParams(window.location.search).get('code');
      return getAuthorization(apiKey, authCode, 'authorization_code').then(authorization => {
        console.log('Authorization: Got initial auth')
        return store.set('D2LC::Authorization', authorization);
      });
    } else if (localStorageAuth && localStorageAuth.authorizationExpiresAt < Date.now()) {
      return getAuthorization(apiKey, localStorageAuth.refresh_token, 'refresh_token').then(
        authorization => {
          console.log('Authorization: Auth expired and updated')
          return store.set('D2LC::Authorization', authorization);
        }
      );
    } else if (localStorageAuth && localStorageAuth.authorizationExpiresAt > Date.now()) {
      console.log('Authorization: Current auth has not expired')
      return Promise.resolve(localStorageAuth);
    } else {
      throw new Error('Users is logged out');
    }
  });
}

function getAuthorization(apiKey, token, grantType) {
  window.history.pushState(null, 'D2LC', '/');
  return axios
    .post(
      'https://www.bungie.net/platform/app/oauth/token/',
      `&client_id=${47209}&client_secret=${"fmZXC.l7ferDqozZU58bGoo7KS9yUtCvgttg7qyy.zE"}&${
        grantType === 'refresh_token' ? 'refresh_token' : 'code'
      }=${token}&grant_type=${grantType}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
    .then(response => {
      if (response.data.access_token) {
        return Object.assign(response.data, {
          authorizationExpiresAt: Date.now() + response.data.expires_in * 1000,
          refreshExpiresAt: Date.now() + response.data.refresh_expires_in * 1000,
        });
      } else {
        return new Error('Could Not Get Access Tokens');
      }
    });
}