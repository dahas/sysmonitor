const express = require('express');
const os = require("os-utils");
const http = require('http');
const ws = require('ws');

const app = express();

const port = process.env.PORT || 8000;
const server = http.createServer(app);

server.listen(port, () => console.log(`HTTP server running on port ${port}...`));

// WebSocket Server

const wsPort = 8088;
const wsServer = new ws.Server({ port: wsPort });

console.log(`WebSocket server is running on port ${wsPort}...`);

let interval = [];

wsServer.on('connection', socket => {
  startMeasuring(socket);

  socket.on('message', m => {
    switch (m) {
      case 'stop':
        stopMeasuring();
        break;
      case 'start':
        startMeasuring(socket);
        break;
    }
  });

  socket.on('close', () => {
    stopMeasuring();
  });
});

function startMeasuring(socket) {
  interval.push(setInterval(() => {
    let sysinfo = {
      memTotal: Math.floor(os.totalmem()),
      memFree: Math.floor(os.freemem()),
      memUsed: Math.floor(os.totalmem() - os.freemem()),
      uptime: msToTime(os.sysUptime() * 1000)
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

// -------- HELPER:

function msToTime(duration) {
  var seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
    days = Math.floor((duration / (1000 * 60 * 60 * 24)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return days + "d:" + hours + "h:" + minutes + "m:" + seconds + "s";
}
