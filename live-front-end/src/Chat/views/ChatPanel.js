import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Message from './Message.js';
import SendMsg from './SendMsg.js';
import {FETCHING,FAILURE} from '../status.js';
import {ListGroup} from 'react-bootstrap';
import {ListGroupItem} from 'react-bootstrap';

class ChatPanel extends Component {

  render() {
    return (
      <div>
        <ListGroup className="chat-Panel">
          <ListGroupItem bsStyle="info">Let's talk</ListGroupItem>
          {
            this.props.messages.map((item) => {
              if(item.text === FETCHING || item.text === FAILURE) {
                return (
                  <ListGroupItem className="list-Group-Item" bsStyle="info">{item.text}</ListGroupItem>
                )
              }
              return (
                <Message
                  id={item.id}
                  text={item.text}
                  time={item.time}
                />
              )
            })
          }
        </ListGroup>

        <SendMsg />
      </div>
    )
  }
}

ChatPanel.PropTypes = {
  messages: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  return {
    messages:state.messages
  };
}

export default connect(mapStateToProps)(ChatPanel);
