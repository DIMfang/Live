import {SEND_MESSAGE, FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE} from './actionTypes.js';
import {FETCHING,FAILURE} from './status.js';
let nextSeqId = 0;

export const send = (message,roomID) => ({
  type: SEND_MESSAGE,
  message,
  roomID
});

export const fetchChatHistoryStarted = () => ({
  type: FETCH_STARTED,
  message: FETCHING
});

export const fetchChatHistorySuccess = (history) => ({
  type: FETCH_SUCCESS,
  history
});

export const fetchChatHistoryFailure = (error) => ({
  type:FETCH_FAILURE,
  message: FAILURE
});

export const fetchChatHistory = (roomID) => {
  return (dispatch) => {
    const apiUrl = `http://localhost:8080/chat/${roomID}/history`;

    const seqId = ++ nextSeqId;

    const dispatchIfValid = (action) => {
      if (seqId === nextSeqId) {
        return dispatch(action);
      }
    }

    dispatchIfValid(fetchChatHistoryStarted())

    fetch(apiUrl).then((response) => {
      if (response.status !== 200) {
        throw new Error('Fail to get response with status ' + response.status);
      }

      response.json().then((responseJson) => {
        dispatchIfValid(fetchChatHistorySuccess(responseJson));
      }).catch((error) => {
        console.log(error);
        dispatchIfValid(fetchChatHistoryFailure(error,roomID));
      });
    }).catch((error) => {
      console.log(error);
      dispatchIfValid(fetchChatHistoryFailure(error,roomID));
    })
  };
}
