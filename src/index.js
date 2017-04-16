import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import App from './components/Main';
import About from './components/About';
import Options from './components/Options';
import Play from './components/Play';
import Stage from './components/Stage';
import LayoutWrapper from './components/LayoutWrapper';

require('./styles/layout.scss');
require('normalize.css');

import reduxStore from './stores/reduxStore';

reduxStore.subscribe(()=> {
    // console.log('reduxStore nowyStan: ', reduxStore.getState());
});

// Render the main component into the dom
ReactDOM.render((
<Provider store={reduxStore}>
  <Router history={browserHistory}>
    <Route path="/" component={LayoutWrapper}>
      <IndexRoute component={App}/>
      <Route path="/about" component={About} />
      <Route path="/options" component={Options} />
      <Route path="/play" component={Play} />

    </Route>
      <Route path="/stage/:stageId" component={Stage}/>
  </Router>
</Provider>
), document.getElementById('app'));
