import {SUBSCRIBE_LIVE} from './actionTypes.js';

export default (state={liveUrl:''}, action) => {
  if (action.type === SUBSCRIBE_LIVE) {
    return action.url;
  } else {
    return state;
  }
}
