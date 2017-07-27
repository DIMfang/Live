import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import WSClient from '../../WebSocket/WSClient.js';

import {send} from '../actions.js';

class SendMsg extends Component {
  constructor(props, context) {
    super(props, context);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.pushMessage = this.pushMessage.bind(this);
    this.state = {
      text: ''
    };

  }

  componentDidMount() {

    this.wsclient = new WSClient(this.props.url,this.pushMessage);
    this.wsclient.connect();
  }

  // destroy player on unmount
  componentWillUnmount() {
    this.wsclient.dispose();
  }

  onSubmit(ev) {
    ev.preventDefault();

    const text = this.state.text;
    if(!text.trim()) {
      return;
    }
    this.wsclient.send(text);
  }

  onChange(event) {
    this.setState({text:event.target.value});
  }

  pushMessage(newMessage) {
    this.props.onSendMsg(newMessage.body);
  }

  render() {
    return (
      <div className="sendmsg">
        <form onSubmit={this.onSubmit}>
          <input className="msg-to-send" type="text" onChange={this.onChange} value={this.state.text} />
          <button className="send-button" type="submit">
            Send
          </button>
        </form>
      </div>
    )
  }
}

SendMsg.propTypes = {
  onSendMsg : PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    url: '/chatting/chat'
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSendMsg: (text) => {
      dispatch(send(text));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SendMsg);
