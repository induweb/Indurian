import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from './components/Main';
import About from './components/About';
import Options from './components/Options';
import Play from './components/Play';
import Stage from './components/Stage';
import LayoutWrapper from './components/LayoutWrapper';
import stagesData from 'json-loader!./sources/data.json';

require('./styles/layout.scss');
require('normalize.css');

function StateStore() {
    this.state = {};
    this.callback = function(){};
    this.interval = null;

    // metoda informujaca ze w stanie jest zmiana
    this.dispatchEvents = (state)=> {
        console.log('state in DE', state);
        this.callback(state);
    };



    this.addListener = (callback)=> {
        console.log('callback from addlistener', callback);
        this.callback = callback;
    };
}

let actions = {
    resetSpell: function(state) {
        console.log('stateAction',state);
        state.spellPosition = {
            left: 60,
            top: -10
        };
        state.wizardState = 'idle';

        // this.interval = null;
        AppState.dispatchEvents(state);
    },
    handleKeyPressed: (state, event) => {
        console.log('OOOLLLL', state);
        console.log('ev', event);

        switch (event.keyCode) {
            case 38: {
                state.wizardPosition = {
                    top: state.wizardPosition.top - 5
                };
                AppState.dispatchEvents(state);
                break;
            }
            case 39: {
                let spellPositionTop =  state.wizardPosition.top + 20;
                // clearInterval(this.interval);
console.log('interval', !AppState.interval);
                if (!AppState.interval) {
                    AppState.interval = setInterval(()=>{
                        console.log('duuupa');
                        if (state.spellPosition.left > 800) {
                            clearInterval(AppState.interval);
                            actions.resetSpell(state);
                            return;
                        }
                        state.spellPosition = {
                            left: state.spellPosition.left + 5,
                            top: spellPositionTop
                        };
                        state.wizardState =  'attack';
                        AppState.dispatchEvents(state);
                    }, 15);
                } else {
                    clearInterval(AppState.interval);
                    AppState.interval = null;
                    actions.resetSpell(state);
                    AppState.dispatchEvents(state);
                }

                break;
            }
            case 40: {
                state.wizardPosition = {
                    top: state.wizardPosition.top + 5
                };
                AppState.dispatchEvents(state);
                break;
            }
        }
        // AppState.dispatchEvents(state);
    }
};

let AppState = new StateStore();
AppState.state = {
    wizardPosition: {
        top: 175
    },
    spellPosition: {
        left: 50,
        top: -10
    },
    wizardState: 'idle',
    stagesData: stagesData
};


// Render the main component into the dom
ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={LayoutWrapper}>
      <IndexRoute component={App}/>
      <Route path="/about" component={About} />
      <Route path="/options" component={Options} />
      <Route path="/play" component={Play} />

    </Route>
      <Route path="/stage/:stageId" component={Stage} store={AppState} actions={actions}/>
  </Router>
), document.getElementById('app'));
