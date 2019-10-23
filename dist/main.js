const { app, BrowserWindow } = require('electron');

let win;

// Allow only a single instance of the app
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', () => {
    if (win) { // Bring running app to front
      if (win.isMinimized()) win.restore()
      win.focus()
    }
  })

  // Import and launch the websocket server
  require('./sysinfo/os');

  app.on('ready', createWindow)

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    if (win === null) {
      createWindow()
    }
  })

  function createWindow() {
    win = new BrowserWindow({
      width: 1100,
      height: 507,
      title: 'SystemMonitor v1.0.0',
      icon: __dirname + '/SystemMonitor.ico',
      show: false,

      webPreferences: {
        nodeIntegration: true
      }
    })

    win.loadFile('sysmonitor/index.html')
    win.setMenu(null);

    win.once('ready-to-show', () => { win.show() });
    win.on('closed', () => { win = null });
  }
}
