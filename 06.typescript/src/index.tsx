// import * as React from 'react';
// import * as ReactDOM from 'react-dom';

// import { Hello } from './components/Hello';

// import('lodash').then((_) => {
//   console.log(_.endsWith('aa', 'a'))
// })

// ReactDOM.render(
//   <Hello compiler="Babel" framework="pesho" />,
//   document.getElementById("app")
// );

// if (module.hot) {
//   module.hot.accept('./components/Hello', function() {
//     console.log('Accepting the updated Hello module!');
//   })
// }

import { Person } from './person';
// import * as _ from 'lodash';

const p = new Person('Pesho', 2);
// console.log(_.has(p, 2));
