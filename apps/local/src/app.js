let Niwa = require("../../../src/niwa");

class AppUi {
    constructor(ui) {
        this.userInterface = ui;
    }
    setup(userInterface) {
        this.userInterface = userInterface;
        
        //this.userInterface.renderer.shadowMapEnabled = true;
        
        this.userInterface.camera.position.set(0, 20, 30);
        this.controls = new Niwa.OrbitControls(this.userInterface.camera);
        
        //this.userInterface.scene.add( new THREE.AmbientLight( 0xcccccc ) );
          
        document.addEventListener( 'keydown', this.onKeyDown.bind(this), false );
        document.addEventListener( 'keyup', this.onKeyUp.bind(this), false );
        document.addEventListener( 'mousedown', this.onMouseDown.bind(this), false );
    }

    update(delta) {
        this.controls.update(delta);
    }

    onKeyDown( event ) {
        switch ( event.keyCode ) {
        case 32 : // space
            this.shotball();
            break;
        }
    }
    
    onKeyUp( event ) {
        switch( event.keyCode ) {
        }   
    }

    onMouseDown(event) {
        switch (event.button) {
        case 0:
            this.leftMouse = true; 
            break;
        case 2:
            this.rightMouse= true; 
            break;
        }
    }

    shotball() {
       let pos = this.userInterface.camera.position;
            let dir = new Niwa.THREE.Vector3(0, 0, -1);
            dir.applyQuaternion(this.userInterface.camera.quaternion);
            this.userInterface.request({
                func: "shotball",
                options: {pos: pos, dir: dir}
            });
    }
}

class AppWorld {
    constructor(world){
        this.world = world;
        this.sum = 0;
    }
    
    setup(){
        // Floor
        let actorParams = new Niwa.BoxActorParams(new Niwa.Vector3D(50, 1, 50));
        actorParams.textureName = "../../libs/three.js/examples/textures/terrain/grasslight-big.jpg";
        let actor = Niwa.World.createActor("floor", actorParams);
        actor.setPosition(new Niwa.Vector3D(0, -0.1, 0));
        this.world.add(actor);

        // Spheres
        actorParams = new Niwa.SphereActorParams(1.0);
        actorParams.mass = 5.0;
        actorParams.textureName = "../../libs/three.js/examples/textures/crate.gif";
        
        actor = Niwa.World.createActor("sphere0", actorParams);
        actor.setPosition(new Niwa.Vector3D(0.0, 25.0, 0.0));
        this.world.add(actor);

        actor = Niwa.World.createActor("sphere1", actorParams);
        actor.setPosition(new Niwa.Vector3D(0.5, 23.0, 0.0));
        this.world.add(actor);

        actor = Niwa.World.createActor("sphere2", actorParams);
        actor.setPosition(new Niwa.Vector3D(0.5, 20.0, -0.5));
        this.world.add(actor);        

        // Boxes
        actorParams = new Niwa.BoxActorParams(new Niwa.Vector3D(1, 1, 1));
        actorParams.mass = 10;        
        actorParams.textureName = "../../libs/three.js/examples/textures/crate.gif";        

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 2; j++) {
            actor = Niwa.World.createActor("box0_" + i + "_" + j, actorParams);
            actor.setPosition(new Niwa.Vector3D(5 - 2 * i, 10 + 2 * j, 5));
            this.world.add(actor);

            actor = Niwa.World.createActor("box1_" + i + "_" + j, actorParams);
            actor.setPosition(new Niwa.Vector3D(3 - 2 *i, 10 + 2 * j, -5));
            this.world.add(actor);

            actor = Niwa.World.createActor("box2_" + i + "_" + j, actorParams);
            actor.setPosition(new Niwa.Vector3D(5, 10 + 2 * j, 3 - 2 * i));
            this.world.add(actor);

            actor = Niwa.World.createActor("box3_" + i + "_" + j, actorParams);
            actor.setPosition(new Niwa.Vector3D(-5 , 10 + 2 * j, 5 - 2 *i));
            this.world.add(actor);
            }
        }

        let materials = [
            '../../libs/three.js/examples/textures/cube/skybox/px.jpg' ,
            '../../libs/three.js/examples/textures/cube/skybox/nx.jpg' ,
            '../../libs/three.js/examples/textures/cube/skybox/py.jpg' ,
            '../../libs/three.js/examples/textures/cube/skybox/ny.jpg' ,
            '../../libs/three.js/examples/textures/cube/skybox/pz.jpg' ,
            '../../libs/three.js/examples/textures/cube/skybox/nz.jpg'  
        ];
        actorParams = new Niwa.SkyBoxActorParams(materials);
        actor = Niwa.World.createActor("skybox", actorParams);
        this.world.add(actor);
    }
    
    update(delta){
    }

    shotball(options) {
        //console.log(options);

        let actorParams = new Niwa.SphereActorParams(0.5);
        actorParams.mass = 5;
        actorParams.textureName = "../../libs/three.js/examples/textures/crate.gif";
        let actor = Niwa.World.createActor("shot" + this.sum, actorParams);
        actor.setPosition(options.pos);
        this.world.add(actor);

        //console.log("dir: (" + options.dir.x + ", " + options.dir.y + ", " + options.dir.z + ")");
        actor.applyLocalImpulse(options.dir.multiplyScalar(500), new Niwa.Vector3D(0, 0, 0));
        this.sum += 1;     
    }
}

app = new Niwa.LocalApplication(AppUi, AppWorld);
app.run();
