import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import WSClient from '../../WebSocket/WSClient.js';

import {send,fetchChatHistory} from '../actions.js';

import {FormGroup} from 'react-bootstrap';
import {InputGroup} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Glyphicon} from 'react-bootstrap';

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
    this.props.onChangeRoom(this.props.id);
    this.wsclient = new WSClient(this.props.url, this.props.id, this.pushMessage);
    this.wsclient.connect();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.id !== this.props.id) {
      this.props.onChangeRoom(nextProps.id);
      this.wsclient.changeSubscribe(nextProps.id);
    }
    return true;
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
    this.props.onSendMsg(newMessage.body,this.props.id);
  }

  render() {
    return (
      <div className="sendmsg">
        <form onSubmit={this.onSubmit}>
          <FormGroup>
            <InputGroup>
              <InputGroup.Addon>
                <Glyphicon glyph="pencil" />
              </InputGroup.Addon>
              <FormControl type="text" onChange={this.onChange} value={this.state.text} />
              <InputGroup.Button>
                <Button bsStyle="info" type="submit">Send</Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
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
    url: '/chatting/chat/',
    id: state.liveUrl.roomID
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSendMsg: (text,roomID) => {
      dispatch(send(text,roomID));
    },
    onChangeRoom: (roomID) => {
      dispatch(fetchChatHistory(roomID));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SendMsg);
