// Build
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Third-party
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';

// App
import './public.scss';
import App from 'Components/App';
import Router from 'Components/Router';
import { client } from 'Client';


ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('sherbet-app')
);
