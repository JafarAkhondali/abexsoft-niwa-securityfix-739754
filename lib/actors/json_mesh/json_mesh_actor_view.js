niwa.JsonMeshActorView = function(name, actorInfo, userInterface) {
    niwa.ActorView.call(this, userInterface);        

    var that = this;
    this.name = name;
    this.actorInfo = actorInfo;
    this.userInterface = userInterface;
    this.object = new THREE.Object3D();
    //this.object.useQuaternion = true;
    userInterface.scene.add(this.object);
    
    var loader = new THREE.JSONLoader();
    loader.load(actorInfo.model, 
                function ( geometry, materials ) {
                    var faceMaterial = new THREE.MeshFaceMaterial( materials );
                    that.mesh = new THREE.Mesh( geometry, faceMaterial );                    

                    that.mesh.scale.x = actorInfo.scale.x;
                    that.mesh.scale.y = actorInfo.scale.y;
                    that.mesh.scale.z = actorInfo.scale.z;
                    
                    //that.mesh.scale.set( s, s, s );
                    that.mesh.castShadow = actorInfo.castShadow;
                    that.mesh.receiveShadow = actorInfo.receiveShadow;
                    
                    that.mesh.position.set(actorInfo.viewPositionOffset.x, 
                                           actorInfo.viewPositionOffset.y,
                                           actorInfo.viewPositionOffset.z);
                    
                    that.object.add(that.mesh)
                    
                    //          
                }
               );
};

niwa.JsonMeshActorView.prototype = Object.create(niwa.ActorView.prototype);
niwa.JsonMeshActorView.prototype.constructor = niwa.ActorView;

niwa.JsonMeshActorView.prototype.setTransform = function(transform) {
    
    // takes a little longer to load a mesh.
    if (this.object === undefined)
        return;
    
    niwa.ActorView.prototype.setTransform.call(this, transform);
};

niwa.JsonMeshActorView.prototype.updateAnimation = function(delta) {
};


niwa.UserInterface.setCreator(
    niwa.JsonMeshActorInfo.prototype.type, 
    function(name, actorInfo, userInterface) {
        return new niwa.JsonMeshActorView(name, actorInfo, userInterface);
    }
);
