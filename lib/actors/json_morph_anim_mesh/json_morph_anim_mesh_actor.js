(function (exports) {
    exports.JsonMorphAnimMeshActor = JsonMorphAnimMeshActor;
    
    function JsonMorphAnimMeshActor(actorInfo, actorManager) {
        exports.Actor.call(this, actorInfo, actorManager);
        
        var cShape = new Ammo.btBoxShape(new Ammo.btVector3(actorInfo.width / 2,
                                                            actorInfo.height / 2,
                                                            actorInfo.depth / 2));
        var inertia = new Ammo.btVector3();
        cShape.calculateLocalInertia(actorInfo.mass, inertia);
        
        var rb = actorManager.physics.createRigidBody(this, actorInfo, cShape, inertia);
        actorManager.physics.addRigidBody(rb, actorInfo);
        
        this.physicsState = new exports.PhysicsState(actorManager.physics);
        this.physicsState.rigidBody = rb;

        this.curAnimLabel = null;
        this.curAnimFps = 1;        
    };
    
    JsonMorphAnimMeshActor.prototype = Object.create(exports.Actor.prototype);
    JsonMorphAnimMeshActor.prototype.constructor = exports.Actor;

    JsonMorphAnimMeshActor.prototype.playAnimation = function(label, fps){
        if (this.actorInfo.animLabels) {
            if (this.actorInfo.animLabels[label]) {
                console.log("current label: " + label);                
                this.curAnimLabel = label;
                this.curAnimFps = this.actorInfo.animLabels[label][2];
            }
            else
                console.log("No such animation label: " + label);
            
            if (fps)
                this.curAnimFps = fps;
        }
    };
    
    exports.ActorManager.setCreator(
        exports.JsonMorphAnimMeshActorInfo.prototype.type, 
        function(actorInfo, actorManager){
            return new exports.JsonMorphAnimMeshActor(actorInfo, actorManager);
        }
    );
    
})(typeof exports === 'undefined' ? niwa : exports);
