import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {reducer as videoReducer} from './Video';
import {reducer as chatReducer} from './Chat';

import Perf from 'react-addons-perf';

const win = window;
win.Perf = Perf;

const reducer = combineReducers({
  liveUrl: videoReducer,
  messages: chatReducer
});

const middlewares = [];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(require('redux-immutable-state-invariant')());
}

const storeEnhancers = compose(
  applyMiddleware(...middlewares),
  (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
);

const store = createStore(reducer,{liveUrl: {liveUrl:' rtmp://localhost/live/',roomID:1}, messages:[]},storeEnhancers);

export default store;
