import React from 'react';

import { settings } from 'Settings';


export default function Login() {
  return (
    <p>
      <strong>You rock but...</strong>
      you need to <a href={settings.auth.loginUrl}>log in</a>.
    </p>
  );
}
