import EventEmitter from 'events';
import { ipcRenderer, remote, nativeImage } from 'electron';
const electronImageResize = require('electron-image-resize');
const { writeFileSync } = require('fs');

const resizer = new EventEmitter();

ipcRenderer.on('file-opened', (event, file) => {
  let newWidth = parseInt(document.getElementById('width').value / 2);
  let originalImage = nativeImage.createFromPath(file);
  let originalSize = originalImage.getSize();
  var newHeight = parseInt(originalSize.height * newWidth / originalSize.width);
  console.log(newWidth, newHeight);


  electronImageResize({
    url: 'file://' + file,
    width: newWidth,
    height: newHeight
  }).then(img => {
    writeFileSync('/Users/JEC/desktop/resized.png', img.toPng());
  });
});

module.exports = resizer;
