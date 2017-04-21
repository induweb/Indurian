import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import transform from './vendor/transform';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import App from './components/Main';
import About from './components/About';
import Scores from './components/Scores';
import Play from './components/Play';
import Stage from './components/Stage';
import LayoutWrapper from './components/LayoutWrapper';

require('./styles/layout.scss');
require('normalize.css');

import reduxStore from './stores/reduxStore';

reduxStore.subscribe(()=> {
    // console.log('reduxStore nowyStan: ', reduxStore.getState());
});

window.addEventListener('resize', transform.fillDiv);
window.addEventListener('load', transform.fillDiv);

// Render the main component into the dom
ReactDOM.render((
<Provider store={reduxStore}>
  <Router history={browserHistory}>
    <Route path="/" component={LayoutWrapper}>
      <IndexRoute component={App}/>
      <Route path="/about" component={About} />
      <Route path="/scores" component={Scores} />
      <Route path="/play" component={Play} />

    </Route>
      <Route path="/stage/:stageId" component={Stage}/>
  </Router>
</Provider>
), document.getElementById('app'));

//TODO LIST:
//////////////po dodniu wyniku znika formularz, pojawia sie link do listy wyników
//bonusy ze zbitych bloków
//przeciwnicy
//animacja porazki
//////////////button scores, poprawienie wszystkich
//////////////responsywnosc
//sterowanie myszą


