let THREE = require("../../../libs/three.js/build/three");
let UserInterface = require('../../user_interface/user_interface');
let ActorView = require('../actor_view');
let SkyBoxActorParams = require('./sky_box_actor_params');

class SkyBoxActorView extends ActorView {
    constructor(name, actorParams) {
        super(name, actorParams);

        let materials = actorParams.materials;
        let loader = new THREE.CubeTextureLoader();
        let textureCube = loader.load(actorParams.materials);
        //let textureCube = THREE.ImageUtils.loadTextureCube(materials, THREE.CubeRefractionMapping);
        
        let shader = THREE.ShaderLib[ "cube" ];
        shader.uniforms[ "tCube" ].value = textureCube;
    
        var material = new THREE.ShaderMaterial( 
            {
                fragmentShader: shader.fragmentShader,
                vertexShader: shader.vertexShader,
                uniforms: shader.uniforms,
                depthWrite: false,
                side: THREE.BackSide
            } );
    
        this.mesh = new THREE.Mesh( new THREE.BoxGeometry( 300, 300, 300 ), material);
        //this.mesh = new THREE.Mesh(geometry, material);
    }

    static create(name, actorParams) {
        return new SkyBoxActorView(name, actorParams);
    }
}

UserInterface.setCreator(SkyBoxActorParams.type, SkyBoxActorView.create);

module.exports = SkyBoxActorView;
