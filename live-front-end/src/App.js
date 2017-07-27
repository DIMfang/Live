import React from 'react';
import {views as VideoPanel} from './Video/';
import {views as ChatPanel} from './Chat/';

function LiveApp() {
  return (
    <div>
      <VideoPanel />
      <ChatPanel />
    </div>
  );
}

export default LiveApp;
