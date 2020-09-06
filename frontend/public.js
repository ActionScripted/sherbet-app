import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';

import './public.scss';
import App from 'Components/App';


const appContainer = document.getElementById('sherbet-app');
const appData = {};
const appProps = {};

ReactDOM.render(<App data={appData} {...appProps} />, appContainer);
