import React from 'react';
import { render } from 'react-dom';
import Application from './components/application';
const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
import EventEmitter from 'events';
import { ipcRenderer, remote, nativeImage } from 'electron';
const electronImageResize = require('electron-image-resize');
const { writeFileSync } = require('fs');

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
  var holder = this.getElementById('holder');

  window.ondragover = function(e) { e.preventDefault(); return false; };
  window.ondrop = function(e) { e.preventDefault(); return false; };

  window.ondragover = function () { holder.classList.add('hover'); return false; };
  window.ondragleave = function () { holder.classList.remove('hover'); return false; };
  window.ondrop = function (e) {
    e.preventDefault();
    holder.classList.remove('hover');
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
  let newValue = parseInt(document.getElementById('pixels').value);
  if (newValue != parseInt(newValue)){
    alert("You must enter a number");
    return;
  }
  let originalImage = nativeImage.createFromPath(file);
  let originalSize = originalImage.getSize();
  if (dimension === 'width'){
    newWidth = newValue;
    newHeight = parseInt(originalSize.height * newWidth / originalSize.width);
  } else {
    newHeight = newValue;
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
    new Notification('Image Resized', { body: 'Check original folder for resized image(s)' });
  });
}
