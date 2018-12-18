import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Hello } from './components/Hello';

ReactDOM.render(
  <Hello compiler="Babel" framework="pesho" />,
  document.getElementById("app")
);

if (module.hot) {
  module.hot.accept('./components/Hello', function() {
    console.log('Accepting the updated Hello module!');
  })
}