import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';

import App from 'Components/App';

const appContainer = document.getElementById(containerId);
ReactDOM.render(<App data={appData} {...extraProps} />, appContainer);
