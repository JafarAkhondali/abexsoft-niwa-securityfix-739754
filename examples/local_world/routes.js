var path = require('path');
var express = require('express');

var browserHtml = __dirname + "/browser.html";
var browserAppPublic = __dirname;

var app = express();
app.use('/niwa', express.static(path.resolve(__dirname + '/../../builds')));
app.use(express.static(path.resolve(__dirname + '/../../deps')));                        
app.use(express.static(path.resolve(browserAppPublic)));

app.get('/', function (req, res) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress; 
    console.log('user reqest ip addr: %s', ip);
    res.sendFile(path.resolve(browserHtml));
});

var server = require('http').Server(app);

var publicPort = 3000;
var sock = server.listen(publicPort, function () {
    var host = sock.address().address;
    var port = sock.address().port;
    
    console.log('Example app listening at http://%s:%s', host, port);
});

