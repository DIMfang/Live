import {SUBSCRIBE_LIVE} from './actionTypes.js';

export const subscribe = (url) => ({
  type: SUBSCRIBE_LIVE,
  url
});
