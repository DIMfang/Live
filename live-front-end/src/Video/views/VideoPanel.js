import React from 'react';
import VideoPlayer from './VideoPlayer.js';
import Subscribe from './subscribe.js';

import 'video.js/dist/video-js.css';
import './style.css';

export default() => {

  return (
    <div className="videoPanel">
      <VideoPlayer />
      <Subscribe />
    </div>
  );
}
