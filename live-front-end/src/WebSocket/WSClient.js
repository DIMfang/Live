import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export default class WSClient {

  socket;
  stompClient;
  subscription;

  constructor(url, roomID, receive) {
    this.url = url;
    this.receive = receive;
    this.roomID = roomID;

    this.onConnected = this.onConnected.bind(this);
    this.connect = this.connect.bind(this);
  }

  connect() {
    this.socket = new SockJS('http://localhost:8080/liveroom');
    this.stompClient = Stomp.over(this.socket);
    this.stompClient.connect('guest','guest', this.onConnected, this.onError);
  }

  onConnected(frame) {
    console.log('Connected: ' + frame);
    this.subscription = this.stompClient.subscribe(this.url + this.roomID, this.receive);
  }

  changeSubscribe(newID) {
    console.log('Change from room ID:' + this.roomID + ' to ' + newID);
    if(this.subscription) {
      this.subscription.unsubscribe();
      this.roomID = newID;
      this.subscription = this.stompClient.subscribe(this.url + this.roomID, this.receive);
    }
  }

  onError(error) {
    console.log(error);
  }

  send(message) {
    if(this.stompClient) {
      this.stompClient.send("/app/chat/" + this.roomID,{},message);
    }
  }

  // destroy player on unmount
  dispose() {
    if (this.stompClient) {
      this.stompClient.disconnect(function() {
        console.log('disconnected.');
      });
    }
  }
}
