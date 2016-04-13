import React, { Component } from 'react';
import { remote } from 'electron';
import Form from './form';

const { openFile } = remote.require(`${__dirname}/../main`);

class Application extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <div>
          <Form />
        </div>
        <div className="controls">
          <button className="controls-open-file" onClick={() => openFile()}>Open File</button>
        </div>
      </div>
    );
  }
}

export default Application;
