import {SEND_MESSAGE} from "./actionTypes.js";

export default (state=[], action) => {
  if (action.type === SEND_MESSAGE) {
    return [
      {
        text: action.message,
        roomID: action.roomID
      }, ...state
    ]
  } else {
    return state;
  }
};
