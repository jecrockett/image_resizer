import EventEmitter from 'events';
import { ipcRenderer, remote } from 'electron';
const electronImageResize = require('electron-image-resize');
const { writeFileSync } = require('fs');

const resizer = new EventEmitter();

ipcRenderer.on('file-opened', (event, file) => {
  console.log(file);
  electronImageResize({
    url: 'file://' + file,
    width: 80,
    height: 40
  }).then(img => {
    writeFileSync('/Users/JEC/desktop/resized.png', img.toPng());
  });
});

module.exports = resizer;
