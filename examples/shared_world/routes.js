var path = require('path');
var express = require('express');

var browser_html = __dirname + "/browser.html";
var browser_app_public = __dirname;

/*
 * User channel route
 */
var user_app = express();
user_app.use('/niwa', express.static(path.resolve(__dirname + '/../../builds')));
user_app.use(express.static(path.resolve(__dirname + '/../../deps')));                        
user_app.use(express.static(path.resolve(browser_app_public)));

user_app.get('/', function (req, res) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress; 
    console.log('user reqest ip addr: %s', ip);
    res.sendFile(path.resolve(browser_html));
});

var user_port = 3000;
var user_server = require('http').Server(user_app);
exports.socket_io = require('socket.io')(user_server);

var user_sock = user_server.listen(user_port, function () {
    var host = user_sock.address().address;
    var port = user_sock.address().port;
    
    console.log('Example app listening at http://%s:%s', host, port);
});

/* 
 *  Admin channel route
 */
/*
var admin_app = express();
admin_app.get('/', function (req, res) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('admin reqest ip addr: %s', ip);
    res.sendFile(__dirname + '/admin.html');    
}.bind(this));
        
var admin_port = this.admin_port;
var admin_server = require('http').Server(this.admin_app);
var admin_sock = admin_server.listen(admin_port, function () {
    var host = admin_sock.address().address;
    var port = admin_sock.address().port;
    
    console.log('Example app listening at http://%s:%s', host, port);
}.bind(this));        
*/

