import React, { Component } from 'react';
import { remote } from 'electron';

const { openFile } = remote.require(`${__dirname}/../main`);

class Application extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="controls">
        <button className="controls-open-file" onClick={() => openFile()}>Open File</button>
      </div>
    );
  }
}

export default Application;
