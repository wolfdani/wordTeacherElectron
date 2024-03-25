const { app, BrowserWindow, ipcMain, dialog } = require("electron/main");
const path = require("node:path");

async function handleFileOpen(event, args) {
  console.log(args);
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ["openFile", "multiSelections"],
  });
  return "miért";
  if (!canceled) {
    return filePaths[0];
  }
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    width: 600,
    height: 400,
    autoHideMenuBar: true,
    resizable: false,
    title: "wordTeacherElectron",
  });
  mainWindow.loadFile(`${__dirname}/index.html`);
  mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  ipcMain.handle("dialog:openFile", handleFileOpen);
  createWindow();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

require("electron-reload")(__dirname, {
  electron: path.join(__dirname, "node_modules", ".bin", "electron"),
});
