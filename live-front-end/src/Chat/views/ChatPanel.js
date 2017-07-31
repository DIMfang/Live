import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Message from './Message.js';
import SendMsg from './SendMsg.js';

import {ListGroup} from 'react-bootstrap';
import {ListGroupItem} from 'react-bootstrap';

class ChatPanel extends Component {

  render() {
    return (
      <div>
        <ListGroup className="chat-Panel">
          <ListGroupItem bsStyle="info">Let's talk</ListGroupItem>
          {
            this.props.messages.map((item) => (
              <Message
                text={item.text}
              />
            ))
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
