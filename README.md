# Sysmonitor

- Ubuntu 22.04
- NodeJS 19.x (18.x recommended for LTS)
- Electron 22.x
- Angular 15.x

![System Monitor](https://github.com/dahas/sysmonitor/blob/assets/sysmonitor.png?raw=true)

## Installation

### Electron

```
sudo apt-get install build-essential clang libdbus-1-dev libgtk-3-dev \ libnotify-dev libasound2-dev libcap-dev \ libcups2-dev libxtst-dev \ libxss1 libnss3-dev gcc-multilib g++-multilib curl \ gperf bison python3-dbusmock openjdk-8-jre
```

If you have a NodeJS distro with a odd version number running, you might get the following error: 

*openssl-legacy-provider is not allowed*

Try this:
```
$ export NODE_OPTIONS=--openssl-legacy-provider
```

If this doesn´t help, try:
```
$ unset NODE_OPTIONS
```

### System Monitor

Clone the Repository first. Do this afterwards:
```
$ cd sysmonitor
$ npm i
$ cd dist
$ npm i
$ cd sysinfo
$ npm i
$ cd ..
$ cd ..
```

## Run in Browser

Make sure you are in the root folder `sysmonitor`.

### 1. Socket

Run `npm start` to start the web socket.

### 2. Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build`.

## Run Electron App

```
$ cd dist
$ npm start
```
