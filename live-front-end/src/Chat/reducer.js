import {SEND_MESSAGE, FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE} from "./actionTypes.js";

export default (state=[], action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      let obj = JSON.parse(action.message);
      return [
        {
          text: obj.message,
          id:obj.id,
          time:obj.time
        }, ...state
      ]
    case FETCH_STARTED:
      return [
        {
          text: action.message,
        }
      ]
    case FETCH_FAILURE:
      return [
        {
          text:action.message,
        },...state
      ]
    case FETCH_SUCCESS:
      return [
        ...action.history.map((item) => {return ({text: item.message, id:item.id, time: item.time})}),
        ...state
      ]
    default:
      return state;
  }
};
