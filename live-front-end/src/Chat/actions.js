import {SEND_MESSAGE} from './actionTypes.js';

export const send = (message,roomID) => ({
  type: SEND_MESSAGE,
  message,
  roomID
});
