import React, {Component} from 'react';
import {connect} from 'react-redux';
import {subscribe} from '../actions.js';

import {FormGroup} from 'react-bootstrap';
import {InputGroup} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Glyphicon} from 'react-bootstrap';

class Subscribe extends Component {

  constructor(props, context) {
    super(props, context);

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      liveUrl: props.liveUrl
    };

  }

  onSubmit(ev) {
    ev.preventDefault();

    const url = this.state.liveUrl;
    if(!url.trim()) {
      return;
    }
    this.props.onChangeUrl(url);
  }

  onChange(event) {
    this.setState({liveUrl: event.target.value});
  }

  render() {
    return (
      <div className="subscribe">
        <form onSubmit={this.onSubmit}>
          <FormGroup>
            <InputGroup>
              <FormControl type="text" onChange={this.onChange} value={this.state.liveUrl} />
              <InputGroup.Button>
                <Button bsStyle="primary" type="submit"><Glyphicon glyph="play" />  Subscribe</Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    liveUrl: state.liveUrl
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChangeUrl: (url) => {
      dispatch(subscribe(url));
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Subscribe);
