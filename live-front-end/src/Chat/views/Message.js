import React from 'react';
import PropTypes from 'prop-types';

import {ListGroupItem} from 'react-bootstrap';
import {Label} from 'react-bootstrap';


const Message = ({text,time}) => {
    return (
      <ListGroupItem className="list-Group-Item">
        <p><Label bsStyle="info">{time}</Label> {text}</p>
      </ListGroupItem>
    )
};

Message.propTypes = {
  text: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired
}

export default Message;
