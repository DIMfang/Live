import {SEND_MESSAGE} from "./actionTypes.js";

export default (state=[], action) => {
  if (action.type === SEND_MESSAGE) {
    return [
      {
        text: action.message
      }, ...state
    ]
  } else {
    return state;
  }
};
