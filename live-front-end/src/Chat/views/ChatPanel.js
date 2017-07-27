import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Message from './Message.js';
import SendMsg from './SendMsg.js';

import {receive} from '../actions.js';


class ChatPanel extends Component {

  constructor(props, context) {
    super(props, context);
  }
  render() {
    return (
      <div className="chat-Panel">
        <ul className="chat-list">
          {
            this.props.messages.map((item) => (
              <Message
                text={item.text}
              />
            ))
          }
        </ul>
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
