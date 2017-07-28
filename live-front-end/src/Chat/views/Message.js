import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {ListGroupItem} from 'react-bootstrap';

const Message = ({text}) => {
    return (
      <ListGroupItem className="list-Group-Item">
        {text}
      </ListGroupItem>
    )
};

Message.propTypes = {
  text: PropTypes.string.isRequired
}

export default Message;
