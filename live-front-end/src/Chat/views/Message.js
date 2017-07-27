import React, {Component} from 'react';
import PropTypes from 'prop-types';

const Message = ({text}) => {
    return (
      <li className="message-item">
        <label className="text">{text}</label>
      </li>
    )
};

Message.propTypes = {
  text: PropTypes.string.isRequired
}

export default Message;
