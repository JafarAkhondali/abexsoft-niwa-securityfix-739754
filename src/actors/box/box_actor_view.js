let THREE = require("../../../libs/three.js/build/three");
let UserInterface = require('../../user_interface/user_interface');
let ActorView = require('../actor_view');
let BoxActorParams = require('./box_actor_params');

class BoxActorView extends ActorView {
    constructor(name, actorParams) {
        super(name, actorParams);
        let geometry = new THREE.BoxGeometry(actorParams.halfExtents.x * 2,
                                             actorParams.halfExtents.y * 2,
                                             actorParams.halfExtents.z * 2);
        let loader = new THREE.TextureLoader();
        let texture = loader.load(actorParams.textureName);
        let material = new THREE.MeshBasicMaterial({map: texture});
        this.mesh = new THREE.Mesh(geometry, material);
    }

    static create(name, actorParams) {
        return new BoxActorView(name, actorParams);
    }
}

UserInterface.setCreator(BoxActorParams.type, BoxActorView.create);

module.exports = BoxActorView;
