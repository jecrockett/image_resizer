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
  const files = dialog.showOpenDialog(mainWindow, {
    // add ability to select multiple files and/or folder
    properties: ['openFile'],
    filters: [
      { name: 'Image Files', extensions: ['jpg', 'png', 'jpeg'] }
    ]
  });

  if (!files) { return; }

  const filePath = files[0];
  app.addRecentDocument(filePath);

  mainWindow.webContents.send('file-opened', filePath );
};

exports.openFile = openFile;
