import {SUBSCRIBE_LIVE} from './actionTypes.js';

export default (state={liveUrl:'', roomID:'1'}, action) => {
  if (action.type === SUBSCRIBE_LIVE) {
    return {
      liveUrl:action.url,
      roomID:action.roomID
    }
  } else {
    return state;
  }
}
