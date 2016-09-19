let Niwa = require("../../../src/niwa");

class AppUi {
    constructor(ui) {
        this.userInterface = ui;
    }
    setup(userInterface) {
        this.userInterface = userInterface;
        this.morphs = [];
        
        //this.userInterface.renderer.shadowMapEnabled = true;
        
        this.userInterface.camera.position.set(0, 5, 10);
        this.controls = new Niwa.OrbitControls(this.userInterface.camera);
        
        //this.userInterface.scene.add( new THREE.AmbientLight( 0xcccccc ) );
          
        this.movementSpeed = 1.0;
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.freeze = false;

        document.addEventListener( 'keydown', this.onKeyDown, false );
        document.addEventListener( 'keyup', this.onKeyUp, false );
    }

    update(delta) {
        if (this.freeze) return;
        
        var actualMoveSpeed = delta * this.movementSpeed;
        
        if ( this.moveForward )
            this.controls.pan(new Niwa.THREE.Vector3(0, 0,  -actualMoveSpeed));
        
        if ( this.moveBackward ) 
            this.controls.pan(new Niwa.THREE.Vector3(0, 0,  actualMoveSpeed));
        
        if ( this.moveLeft ) 
            this.controls.pan(new Niwa.THREE.Vector3(-actualMoveSpeed, 0, 0));
        
        if ( this.moveRight ) 
            this.controls.pan(new Niwa.THREE.Vector3(actualMoveSpeed, 0, 0));
        
        this.controls.update(delta);
        
        if (this.morphs[0])
            this.morphs[0].updateAnimation(delta );
    }

    onKeyDown( event ) {
        switch ( event.keyCode ) {
        case 38: /*up*/
        case 87: /*W*/ that.moveForward = true; break;
            
        case 37: /*left*/
        case 65: /*A*/ that.moveLeft = true; break;
            
        case 40: /*down*/
        case 83: /*S*/ that.moveBackward = true; break;
            
        case 39: /*right*/
        case 68: /*D*/ that.moveRight = true; break;
            
        case 81: /*Q*/ that.freeze = !this.freeze; break;
        }
    }
    
    onKeyUp( event ) {
        switch( event.keyCode ) {
        case 38: /*up*/
        case 87: /*W*/ that.moveForward = false; break;
            
        case 37: /*left*/
        case 65: /*A*/ that.moveLeft = false; break;
            
        case 40: /*down*/
        case 83: /*S*/ that.moveBackward = false; break;
            
        case 39: /*right*/
        case 68: /*D*/ that.moveRight = false; break;
            
        case 82: /*r*/
            
        }   
    }
}

class AppWorld {
    constructor(world){
        this.world = world;
    }
    
    setup(){
        let actorParams = new Niwa.SphereActorParams(1.0);
        actorParams.mass = 1.0;
        actorParams.textureName = "../../libs/three.js/examples/textures/crate.gif";        
        let actor = Niwa.World.createActor("sphere1", actorParams);
        actor.setPosition(new Niwa.Vector3D(0.0, 10.0, 0.0));
        this.world.add(actor);

        actorParams = new Niwa.BoxActorParams(new Niwa.Vector3D(50, 1, 50));
        actorParams.textureName = "../../libs/three.js/examples/textures/terrain/grasslight-big.jpg";
        actor = Niwa.World.createActor("floor", actorParams);
        actor.setPosition(new Niwa.Vector3D(0, -0.1, 0));
        this.world.add(actor);

/*        
        var obj;
        var actorInfo;
        this.world.enableShadow(true);
        
        var materials = [
            '/three.js/examples/textures/cube/skybox/px.jpg' ,
            '/three.js/examples/textures/cube/skybox/nx.jpg' ,
            '/three.js/examples/textures/cube/skybox/py.jpg' ,
            '/three.js/examples/textures/cube/skybox/ny.jpg' ,
            '/three.js/examples/textures/cube/skybox/pz.jpg' ,
            '/three.js/examples/textures/cube/skybox/nz.jpg'  
        ];
        
        actorInfo = new SkyBoxActorInfo(materials);
        obj = this.world.actorManager.createActor("skybox", actorInfo);
        
        actorInfo = new SpotLightActorInfo(0xffffff);
        obj = this.world.actorManager.createActor("spotLight", actorInfo);
        obj.setPosition(new Vector3D(-60,150,-30));
        
        actorInfo = new BoxActorInfo(1, 1, 1);
        actorInfo.textureName = "/three.js/examples/textures/crate.gif";
        actorInfo.mass = 10;
        obj = this.world.actorManager.createActor("box1", actorInfo);
        obj.setPosition(new Vector3D(0, 10, 0));
        
        obj = this.world.actorManager.createActor("box2", actorInfo);
        obj.setPosition(new Vector3D(2, 10, 0));
        
        obj = this.world.actorManager.createActor("box3", actorInfo);
        obj.setPosition(new Vector3D(4, 10, 0));
        
        obj = this.world.actorManager.createActor("box4", actorInfo);
        obj.setPosition(new Vector3D(-2, 10, 0));
        
        actorInfo = new SphereActorInfo(0.5);
        actorInfo.mass = 5;
        actorInfo.textureName = "/three.js/examples/textures/crate.gif";
        obj = this.world.actorManager.createActor("sphere0", actorInfo);
        obj.setPosition(new Vector3D(0, 15, 0));
        
        obj = this.world.actorManager.createActor("sphere1", actorInfo);
        obj.setPosition(new Vector3D(0.5, 17, 0));
        
        obj = this.world.actorManager.createActor("sphere2", actorInfo);
        obj.setPosition(new Vector3D(0, 19, -0.5));
        
        actorInfo = new BoxActorInfo(50, 1, 50);
        actorInfo.textureName = "/three.js/examples/textures/terrain/grasslight-big.jpg";
        obj = this.world.actorManager.createActor("floor", actorInfo);
        obj.setPosition(new Vector3D(0, -0.5, 0));
  */      
    }
    
    update(delta){
    }
}

console.log("test");
app = new Niwa.LocalApplication(AppUi, AppWorld);
app.run();
