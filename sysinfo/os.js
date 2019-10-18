const express = require('express');
const os = require("os-utils");
const http = require('http');
const ws = require('ws');

const app = express();

const port = process.env.PORT || 8000;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`HTTP server running on port ${port}...`);
});

// WebSocket Server

const wsPort = 8088;
const wsServer = new ws.Server({ port: wsPort });

console.log(`WebSocket server is running on port ${wsPort}...`);

wsServer.on('connection', () => {
  setInterval(() => {
    let sysinfo = {
      memTotal: Math.floor(os.totalmem()),
      memFree: Math.floor(os.freemem()),
      uptime: msToTime(os.sysUptime()*1000)
    };
    os.cpuUsage(v => {
      sysinfo.cpu = Math.round(v * 100);
      sysinfo.time = new Date();
      wsServer.clients.forEach(client => {
        client.send(JSON.stringify(sysinfo))
      });
    });
  }, 1000);
});


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
