'use strict';

const electron = require('electron');
const app = electron.app;
const dialog = electron.dialog;
const BrowserWindow = electron.BrowserWindow;
const fs = require('fs');

let mainWindow = null;

app.on('ready', () => {
  mainWindow = new BrowserWindow();
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

const openFile = () => {
  var files = dialog.showOpenDialog(mainWindow, {
    properties: ['openFile', 'multiSelections'],
    filters: [
      { name: 'Image Files', extensions: ['jpg', 'png', 'jpeg'] }
    ]
  });
  if (!files) { return; }
  for(var i = 0; i<files.length; i++){
    app.addRecentDocument(files[i]);
    mainWindow.webContents.send('file-opened', files[i] );
  }
};

const dropFile = (file) => {
  mainWindow.webContents.on('file-dropped', file );
  console.log('in file dropped', file);
  mainWindow.webContents.send('file-opened', file );
};

exports.openFile = openFile;
