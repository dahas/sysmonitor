const express = require('express');
const os = require("os-utils");
const http = require('http');
const ws = require('ws');

const app = express();

const port = process.env.PORT || 8000;
const server = http.createServer(app);

const wsPort = 8088;

server.listen(port, () => console.log(`Socket running on port ${wsPort} ...`));

// WebSocket Server

const wsServer = new ws.Server({ port: wsPort });

let interval = [];

wsServer.on('connection', socket => {
  startMeasuring(socket);

  socket.on('close', () => {
    stopMeasuring();
  });
});

function startMeasuring(socket) {
  interval.push(setInterval(() => {
    let sysinfo = {
      memTotal: Math.floor(os.totalmem()),
      memFree: Math.floor(os.freemem()),
      memUsed: Math.floor(os.totalmem() - os.freemem())
    };
    os.cpuUsage(v => {
      sysinfo.cpu = Math.round(v * 100);
      sysinfo.time = new Date();
      try {
        socket.send(JSON.stringify(sysinfo));
      } catch (e) { }
    });
  }, 1000));
}

function stopMeasuring() {
  interval.forEach(iv => clearInterval(iv));
  interval = [];
}
