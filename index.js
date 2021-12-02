/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import DevMenu from '@terrysahaidak/react-native-devmenu';
import App from './src/App';
import { name as appName } from './app.json';

// To see all the requests in the chrome Dev tools in the network tab.
XMLHttpRequest = GLOBAL.originalXMLHttpRequest
  ? GLOBAL.originalXMLHttpRequest
  : GLOBAL.XMLHttpRequest;

// fetch logger
global._fetch = fetch;
global.fetch = function(uri, options, ...args) {
  return global._fetch(uri, options, ...args).then((response) => {
    console.log('Fetch', {
      request: { uri, options, ...args },
      response,
    });
    return response;
  });
};

const Root = () => (
  <DevMenu numberOfTouches={4}>
    <App />
  </DevMenu>
);

AppRegistry.registerComponent(appName, () => Root);
