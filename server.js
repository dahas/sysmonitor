var express = require('express');
var path = require('path');

var app = express();
app.use(express.static(path.join(__dirname, 'dist/sysmonitor')));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist/sysmonitor/index.html'));
});
app.listen(9000);

console.log('Production server is running: localhost:9000. Ctrl + C to quit.');
