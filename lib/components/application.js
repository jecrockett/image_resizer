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
      <div id="steps">
        <h1>Image Resizer</h1>
        <p className="step">STEP 1</p>
        <div id="form">
          <p>What size do you want?</p>
          <Form />
        </div>
        <p className="step">STEP 2</p>
        <div id="holder">
          <p id="drop">Drop Your Images Here</p>
        </div>
        <div id="button">
          <p>Or find your images here:</p>
          <button className="button" id="button-open-file" onClick={() => openFile()}>Open File</button>
        </div>
        <div>
          <p className="step">STEP 3</p>
          <p id="finish">Check your folder for the resized imaged!</p>
        </div>
      </div>
    );
  }
}

export default Application;
