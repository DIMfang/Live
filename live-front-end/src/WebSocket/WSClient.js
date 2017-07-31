import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export default class WSClient {

  socket;
  stompClient;

  constructor(url, receive) {
    this.url = url;
    this.receive = receive;

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
    this.stompClient.subscribe(this.url, this.receive);
  }

  onError(error) {
    console.log(error);
  }

  send(message) {
    if(this.stompClient) {
      this.stompClient.send("/app/chat",{},message);
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
