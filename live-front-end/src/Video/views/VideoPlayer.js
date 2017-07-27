import React, {Component} from 'react';
import {connect} from 'react-redux';
import videojs from 'video.js';
import SWF_PATH from 'video.js/dist/video-js.swf';
import VTTJS_PATH from 'videojs-vtt.js/dist/vtt.min.js';

class VideoPlayer extends Component {

  constructor(props,context) {
    super(props, context);
  }

  componentDidMount() {

    videojs.options.flash.swf = SWF_PATH;
    videojs.options['vtt.js'] = VTTJS_PATH;

    const videoJsOptions = {
      autoplay: true,
      controls: true,
      sources: [{
        src: this.props.liveUrl,
        type: 'rtmp/flv'
      }],
      techOrder: ['html5','flash']

    };
    // instantiate video.js
    this.player = videojs(this.videoNode, videoJsOptions, function onPlayerReady() {
      console.log('onPlayerReady', this)
    });
  }

  componentDidUpdate() {
    this.player.src(this.props.liveUrl);
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.liveUrl !== this.props.liveUrl) {
      this.player.src(nextProps.liveUrl);
    }
    return false;
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div className="player-container">
        <video ref={ node => this.videoNode = node } className="video-js">
        </video>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    liveUrl: state.liveUrl
  }
}

export default connect(mapStateToProps)(VideoPlayer);
