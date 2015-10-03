niwa.JsonMorphAnimMeshActorView = function(name, actorInfo, userInterface) {
    niwa.ActorView.call(this, userInterface);        

    var that = this;
    this.name = name;
    this.actorInfo = actorInfo;
    this.curAnimLabel = null;
    this.curAnimFps = 1;
    
    this.userInterface = userInterface;
    this.object = new THREE.Object3D();
    //this.object.useQuaternion = true;
    userInterface.scene.add(this.object);
    
    var loader = new THREE.JSONLoader();
    loader.load(actorInfo.model, 
                function ( geometry, materials ) {
                    for (var i = 0, l = materials.length; i < l; i++) {
                        materials[i].morphTargets = true;
                    }
                    
                    //var material = materials[ 0 ];                        
                    //material.morphTargets = true;
                    //material.color.setHex( 0xffaaaa );
                    //material.ambient.setHex( 0x222222 );
                    //console.log(material);
                    var faceMaterial = new THREE.MeshFaceMaterial( materials );
                    that.mesh = new THREE.MorphAnimMesh( geometry, faceMaterial );

                    that.mesh.scale.set(actorInfo.scale.x,
                                        actorInfo.scale.y,
                                        actorInfo.scale.z);
                    
                    // one second duration
                    that.mesh.duration = 1000;
                    
                    // random animation offset
                    //that.mesh.time = 1000 * Math.random();
                    
                    //that.mesh.useQuaternion = true;
                    that.mesh.castShadow = actorInfo.castShadow;
                    that.mesh.receiveShadow = actorInfo.receiveShadow;
                    
                    that.mesh.position.set(actorInfo.viewPositionOffset.x, 
                                           actorInfo.viewPositionOffset.y,
                                           actorInfo.viewPositionOffset.z);

                    if (actorInfo.animLabels){
                        for (var key in actorInfo.animLabels) {
                            that.mesh.setAnimationLabel(key,
                                                        actorInfo.animLabels[key][0],
                                                        actorInfo.animLabels[key][1]);
                        }
                    }
                    that.object.add(that.mesh)
                }
               );
};

niwa.JsonMorphAnimMeshActorView.prototype = Object.create(niwa.ActorView.prototype);
niwa.JsonMorphAnimMeshActorView.prototype.constructor = niwa.ActorView;

niwa.JsonMorphAnimMeshActorView.prototype.setTransform = function(transform) {
    
    // takes a little longer to load a mesh.
    if (this.object === undefined)
        return;
    
    niwa.ActorView.prototype.setTransform.call(this, transform);
};

niwa.JsonMorphAnimMeshActorView.prototype.playAnimation = function(label, fps) {
    if (this.mesh){
        console.log("play: " + label);
        this.mesh.playAnimation(label, fps);
        return true;
    }
    return false;
};

niwa.JsonMorphAnimMeshActorView.prototype.updateAnimation = function(delta) {
    if (this.mesh)
        this.mesh.updateAnimation(delta);
};


niwa.UserInterface.setCreator(
    niwa.JsonMorphAnimMeshActorInfo.prototype.type, 
    function(name, actorInfo, userInterface) {
        return new niwa.JsonMorphAnimMeshActorView(name, actorInfo, userInterface);
    }
);
