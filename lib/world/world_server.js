//
// startup frontend.
//
Ammo = require("../deps/ammo.js/builds/ammo.fast.js").Ammo;

(function (exports) {
    exports.WorldServer = WorldServer;
    
    function WorldServer(server_app_klass, socket_io) {
        this.actorManager = new exports.ActorManager();
        this.server_app = new server_app_klass(this);
        this.socket_io = socket_io
        
        this.syncTimePeriod = 300;
        this.lastSyncTime = 0;
        
        this.firstConnection = true;
        this.sockets = {};
    };

    WorldServer.prototype.run = function() {
        this.socket_io.sockets.on(
            'connection', function (socket) {
                console.log("connect: " + socket.id);
                socket.emit('news', { server: 'hello world' });
                socket.on('test_event', 
                          function (data) {
                              console.log(data);
                          });
                
                if (this.firstConnection){
                    this.setup_server_app();
                    this.firstConnection = false;
                }
                
                this.sockets[socket.id] = socket;
                console.log('connection num: ' + Object.keys(this.sockets).length);
                
                socket.on('disconnect', function(){
                    console.log('disconnect: ' + socket.id);
                    delete this.sockets[socket.id];
                    console.log('connection num: ' + Object.keys(this.sockets).length);
                }.bind(this));
            }.bind(this));
    };

    WorldServer.prototype.setup_server_app = function() {
        this.server_app.setup();    
        
        this.lastTime = Date.now();
        setInterval(this.update.bind(this), 1000 / 30);
    };

    WorldServer.prototype.enableShadow = function(bl) {
        this.actorManager.defaultShadow = bl;
        //       postMessage({type: "shadow", flag: bl});
    };
        
    WorldServer.prototype.update = function(delta) {
        var now;
        var delta;
        
        if (delta === undefined) {
            now = Date.now();
            delta = now - this.lastTime;
            this.lastTime = now;
        }
        
        this.actorManager.update(delta);
        this.server_app.update(delta);
        
        if ((now - this.lastSyncTime) > this.syncTimePeriod) {
            var actors = this.getAllActors();
            for (var key in this.sockets) {
                this.sockets[key].emit('actors', actors);
            }
            this.lastSyncTime = now;
        }
    };    

    
    WorldServer.prototype.getAllActors = function() {
        var actors = {};
        
        for(key in this.actorManager.actors) {
            var actor = {};

            // TODO: create a method of copying values in each actor class.
            
            // actorInfo
            actor.actorInfo = this.actorManager.actors[key].actorInfo;
            
            // transform
            var transform = this.actorManager.actors[key].getTransform();
            actor.transform = new exports.Transform(
                exports.Vector3D.createFromAmmo(transform.getOrigin()),
                exports.Quaternion.createFromAmmo(transform.getRotation()));
            
            // linearVelocity
            var linearVelocity = this.actorManager.actors[key].getLinearVelocity();
            actor.linearVelocity = new exports.Vector3D.createFromAmmo(linearVelocity);

            // Animation
            if (this.actorManager.actors[key].curAnimLabel){
                actor.curAnimLabel = this.actorManager.actors[key].curAnimLabel;
                actor.curAnimFps = this.actorManager.actors[key].curAnimFps;                
            }
            
            actors[key] = actor;
        }
        
        return actors;
    };
})(typeof exports === 'undefined' ? niwa : exports);


