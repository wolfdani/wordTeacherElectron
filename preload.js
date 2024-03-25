const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
  openFile: (args) => ipcRenderer.invoke("dialog:openFile", args),
});
