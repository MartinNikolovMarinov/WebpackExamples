import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as Png1 from '@assets/images/iconfinder_gear_1055051.png'    // 15kb gets added as a file
import * as Svg1 from '@assets/images/iconfinder_go-home_118770.svg'  // 4kb gets inlined

import '@styles/global.css';

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
        <img src={String(Png1)}/>
        <img src={String(Svg1)}/>
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