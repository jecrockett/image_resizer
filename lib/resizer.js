import EventEmitter from 'events';
import { ipcRenderer, remote, nativeImage } from 'electron';
const electronImageResize = require('electron-image-resize');
const { writeFileSync } = require('fs');

const resizer = new EventEmitter();

var newHeight = '';
var newWidth = '';

ipcRenderer.on('file-opened', (event, file) => {
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
    alert("check yo desktop for the new one bitches");
  });
});

module.exports = resizer;
