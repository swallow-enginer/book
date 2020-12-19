import Router from 'next/router';
import React, { Component } from 'react';

import createLoginUrl from '~//src/lib/auth0/url-helper';

export default class RedirectToLogin extends Component {
  componentDidMount() {
    window.location.assign(createLoginUrl(Router.pathname));
  }

  render() {
    return (
        <div>Signing you in...</div>
    );
  }
}
