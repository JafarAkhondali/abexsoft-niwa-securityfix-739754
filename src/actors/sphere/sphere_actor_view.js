let THREE = require("../../../libs/three.js/build/three");
let UserInterface = require('../../user_interface/user_interface');
let ActorView = require('../actor_view');
let SphereActorParams = require('./sphere_actor_params');

class SphereActorView extends ActorView {
    constructor(name, actorParams) {
        super(name, actorParams);
        let geometry = new THREE.SphereGeometry(actorParams.radius);        
        let loader = new THREE.TextureLoader();
        let texture = loader.load(actorParams.textureName);
        let material = new THREE.MeshBasicMaterial({map: texture});
        this.mesh = new THREE.Mesh(geometry, material);
    }

    static create(name, actorParams) {
        return new SphereActorView(name, actorParams);
    }
}
    
UserInterface.setCreator(SphereActorParams.type, SphereActorView.create);

module.exports = SphereActorView;

