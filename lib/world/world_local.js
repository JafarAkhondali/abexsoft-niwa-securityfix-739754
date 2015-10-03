importScripts("/ammo.js/builds/ammo.fast.js");

(function (exports) {
    exports.WorldLocal = WorldLocal;

    function WorldLocal(app_klass) {
        this.actorManager = new exports.ActorManager();
        this.app = new app_klass(this);
	};

    WorldLocal.prototype.enableShadow = function(bl) {
	    this.actorManager.defaultShadow = bl;
	    postMessage({type: "shadow", flag: bl});
	};
	    
    WorldLocal.prototype.update = function(delta) {
        var now;
        var delta;
        
        if (delta === undefined) {
            now = Date.now();
            delta = now - this.lastTime;
            this.lastTime = now;
        }
        
        this.actorManager.update(delta);
        this.app.update(delta);

	    var actors = this.getAllActors();
	    postMessage({type: "update", actors: actors});        
    };    

	WorldLocal.prototype.run = function() {
        this.setup();
    };
    
    WorldLocal.prototype.setup = function() {
        this.app.setup();
        
        this.lastTime = Date.now();
        setInterval(this.update.bind(this), 1000 / 30);
    };
    
    WorldLocal.prototype.getAllActors = function() {
	    var actors = {};
	    
	    for(key in this.actorManager.actors) {
	        var actor = {};
	        
	        actor.actorInfo = this.actorManager.actors[key].actorInfo;
	        
	        var transform = this.actorManager.actors[key].getTransform();
	        actor.transform = new exports.Transform(
		        exports.Vector3D.createFromAmmo(transform.getOrigin()),
		        exports.Quaternion.createFromAmmo(transform.getRotation()));

            if (this.actorManager.actors[key].curAnimLabel){
                actor.curAnimLabel = this.actorManager.actors[key].curAnimLabel;
                actor.curAnimFps = this.actorManager.actors[key].curAnimFps;
            }
            
	        actors[key] = actor;
	    }
	    
	    return actors;
    };
})(typeof exports === 'undefined' ? niwa : exports);

