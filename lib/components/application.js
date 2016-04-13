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
          <p><strong>What size do you want?</strong></p>
          <Form />
        </div>
        <div id="holder">
          <p><strong>Drop Your Images Here</strong></p>
        </div>
        <div className="controls">
          <p><strong>Or find your images here:</strong></p>
          <button className="controls-open-file" onClick={() => openFile()}>Open File</button>
        </div>
      </div>
    );
  }
}



export default Application;
