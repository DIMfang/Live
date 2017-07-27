import {SEND_MESSAGE} from './actionTypes.js';

export const send = (message) => ({
  type: SEND_MESSAGE,
  message
});
