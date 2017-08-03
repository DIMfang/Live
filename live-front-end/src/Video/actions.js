import {SUBSCRIBE_LIVE} from './actionTypes.js';

export const subscribe = (url,roomID) => ({
  type: SUBSCRIBE_LIVE,
  url,
  roomID
});
