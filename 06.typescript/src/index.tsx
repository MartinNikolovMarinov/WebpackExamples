import * as React from 'react';
import * as ReactDOM from 'react-dom';

require('./styles/global.css');

import Hello from './components/Hello';

// function wait(t: number) {
//   return new Promise((resolve) => {
//     setTimeout(() => { resolve() }, t)
//   })
// }

ReactDOM.render(
  (
    <div>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Hello />
      </React.Suspense>
    </div>
  ),
  document.getElementById("app")
);

if (module.hot) {
  module.hot.accept('./components/Hello', function() {
    console.log('Accepting the updated Hello module!');
  })
}