import React from 'react';
import { render } from 'react-dom';
import Application from './components/application';
const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
import EventEmitter from 'events';
import { ipcRenderer, remote, nativeImage } from 'electron';
const electronImageResize = require('electron-image-resize');
const { writeFileSync } = require('fs');

// import resizer from './resizer';
var newHeight = '';
var newWidth = '';

render(<Application />, document.querySelector('.application'));

function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(function(){
  // prevent default behavior from changing page on dropped file
  window.ondragover = function(e) { e.preventDefault(); return false; };
  // NOTE: ondrop events WILL NOT WORK if you do not "preventDefault" in the ondragover event!!
  window.ondrop = function(e) { e.preventDefault(); return false; };
  window.ondragover = function () { this.className = 'hover'; return false; };
  window.ondragleave = function () { this.className = ''; return false; };
  window.ondrop = function (e) {
    e.preventDefault();
    for (var i = 0; i < e.dataTransfer.files.length; ++i) {
      resizeImage(e.dataTransfer.files[i].path);
    }
    return false;
  };
});

ipcRenderer.on('file-opened', (event, file) => {
  resizeImage(file);
});

function resizeImage(file) {
  let dimension = document.getElementById('dimension').value;
  let originalImage = nativeImage.createFromPath(file);
  let originalSize = originalImage.getSize();
  if (dimension === 'width'){
    newWidth = parseInt(document.getElementById('pixels').value);
    newHeight = parseInt(originalSize.height * newWidth / originalSize.width);
  } else {
    newHeight = parseInt(document.getElementById('pixels').value);
    newWidth = parseInt(originalSize.width * newHeight / originalSize.height);
  }
  electronImageResize({
    url: 'file://' + file,
    width: newWidth,
    height: newHeight
  }).then(img => {
    var fileName = file.split('.');
    fileName.pop();
    fileName = fileName.join('.') + '_resized.png';
    writeFileSync(fileName, img.toPng());
    alert("check yo file");
  });
}
