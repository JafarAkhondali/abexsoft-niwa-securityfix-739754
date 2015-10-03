importScripts("/niwa/niwa_local.js");

var HelloWorld = function(world) {
    var that = this;
    this.world = world;
    
    this.setup = function(){
        var obj;
        var actorInfo;
        
        this.world.enableShadow(true);

        // SkyBox
        var materials = [
           '/three.js/examples/textures/cube/skybox/px.jpg' ,
            '/three.js/examples/textures/cube/skybox/nx.jpg' ,
            '/three.js/examples/textures/cube/skybox/py.jpg' ,
            '/three.js/examples/textures/cube/skybox/ny.jpg' ,
            '/three.js/examples/textures/cube/skybox/pz.jpg' ,
            '/three.js/examples/textures/cube/skybox/nz.jpg'  
        ];
        actorInfo = new niwa.SkyBoxActorInfo(materials);
        obj = this.world.actorManager.createActor("skybox", actorInfo);

        // SpotLight
	    actorInfo = new niwa.SpotLightActorInfo(0xffffff);
	    obj = this.world.actorManager.createActor("spotLight", actorInfo);
	    obj.setPosition(new niwa.Vector3D(-60,150,-30));

        // monster of three.js
	    actorInfo = new niwa.JsonMorphAnimMeshActorInfo(
	        '/three.js/examples/models/animated/monster/monster.js');
        actorInfo.scale.x = 0.004
        actorInfo.scale.y = 0.004
        actorInfo.scale.z = 0.004                
	    actorInfo.mass = 10;
	    actorInfo.height = 1;
	    actorInfo.width = 1;
	    actorInfo.depth = 1;
	    actorInfo.viewPositionOffset = new niwa.Vector3D(0, -0.5, 0);
	    obj = this.world.actorManager.createActor("jsonMesh", actorInfo);
	    obj.setPosition(new niwa.Vector3D(0, 5 ,0));

        // stick
	    actorInfo = new niwa.JsonMorphAnimMeshActorInfo(
	        './stick/Stick.json');
	    actorInfo.mass = 10;
	    actorInfo.height = 1;
	    actorInfo.width = 1;
	    actorInfo.depth = 1;
	    actorInfo.viewPositionOffset = new niwa.Vector3D(0, -0.5, 0);
        actorInfo.animLabels = {};
        actorInfo.animLabels["slide"] = [1, 9, 1];        
        actorInfo.animLabels["walk"] = [10, 29, 1];
        actorInfo.animLabels["kick"] = [40, 60, 1];
        actorInfo.animLabels["throw"] = [70, 90, 1];
	    stick = this.world.actorManager.createActor("stick", actorInfo);
	    stick.setPosition(new niwa.Vector3D(10, 5 ,0));
        stick.playAnimation("walk", 10);
        
	    actorInfo = new niwa.BoxActorInfo(50, 1, 50);
	    actorInfo.textureName = "/three.js/examples/textures/terrain/grasslight-big.jpg";
	    obj = this.world.actorManager.createActor("floor", actorInfo);
	    obj.setPosition(new niwa.Vector3D(0, -0.5, 0));
    };
    
    this.update = function(delta){
    };
};

var local = new niwa.WorldLocal(HelloWorld);
local.run();





