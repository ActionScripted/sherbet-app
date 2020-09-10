import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache } from '@apollo/client';

import './public.scss';
import App from 'Components/App';


const appContainer = document.getElementById('sherbet-app');
const appData = {};
const appProps = {};

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://sherbet.test:8000/graphql'
});



client
  .query({
    query: gql`
      query AllUsers
    `
  })
  .then(result => console.log(result));

ReactDOM.render(<App data={appData} {...appProps} />, appContainer);
