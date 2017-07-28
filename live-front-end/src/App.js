import React from 'react';
import {views as VideoPanel} from './Video/';
import {views as ChatPanel} from './Chat/';

import {Grid} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Clearfix} from 'react-bootstrap';

function LiveApp() {
  return (
    <Grid fluid="true" >
      <Row className="show-grid">
        <Col sm={7} md={7} xsOffset={1} >
          <VideoPanel />
        </Col>
        <Clearfix visibleSmBlock></Clearfix>
        <Col sm={3} md={3} >
          <ChatPanel />
        </Col>
      </Row>
    </Grid>
  );
}

export default LiveApp;
