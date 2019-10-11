/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */

import axios from 'axios';
import { EventBus } from './eventbus';


class Auth {
  /**
   * Class constructor.
   */
  constructor() {
    if (this.token) {
      axios.defaults.headers.common = { Authorization: `bearer ${this.token}` };
    }
  }

  /**
   * Save the token to Local Storage.
   *
   * @param {String} token
   */
  set token(token) {
    axios.defaults.headers.common = { Authorization: `bearer ${token}` };
    localStorage.setItem(btoa('token'), token);
  }

  /**
   * Get the token from Local Storage.
   *
   * @returns {String}
   */
  get token() {
    const token = localStorage.getItem(btoa('token'));

    if (!token) {
      return null;
    }

    return token;
  }

  /**
   * Remove the token from Local Storage.
   */
  destroyToken() {
    axios.defaults.headers.common = {};
    localStorage.removeItem(btoa('token'));
  }

  /**
   *  Sign out from account
   */
  signOut() {
    this.destroyToken();
    EventBus.$emit('User:SignedOut');
  }

  /**
   * Verify if the user it's authenticated or not.
   *
   * @returns {Boolean}
   */
  isAuthenticated() {
    return !!this.token;
  }
}

export const auth = new Auth();
