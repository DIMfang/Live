import React from 'react';
import PropTypes from 'prop-types';

import {ListGroupItem} from 'react-bootstrap';
import {Label} from 'react-bootstrap';


const Message = ({text}) => {
    let obj = JSON.parse(text);
    return (
      <ListGroupItem className="list-Group-Item">
        <p><Label bsStyle="info">{obj.time}</Label> {obj.message}</p>
      </ListGroupItem>
    )
};

Message.propTypes = {
  text: PropTypes.string.isRequired
}

export default Message;
