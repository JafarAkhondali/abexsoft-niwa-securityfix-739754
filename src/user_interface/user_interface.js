let THREE = require("../../libs/three.js/build/three");

class UserInterface {
    constructor(applicationUi) {
        var that = this;
        this.application = new applicationUi(this);
        
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );
        
        this.camera = new THREE.PerspectiveCamera(60,
                                                  window.innerWidth / window.innerHeight,
                                                  1, 1000 );
        this.camera.position.z = 20;
        this.camera.lookAt(new THREE.Vector3( 0, 0, 0 ));
        
        this.scene = new THREE.Scene();
        
        this.actorViews = {};
        this.actorNum = 0;
        
        this.onWindowResize = function() {
            that.camera.aspect = window.innerWidth / window.innerHeight;
            that.camera.updateProjectionMatrix();
 
            that.renderer.setSize( window.innerWidth, window.innerHeight );
        };
        window.addEventListener( 'resize', this.onWindowResize, false );
        
    }

    static setCreator(type, creator) {
        this.creators[type] = creator;
    }

    static createActorView(name, actorParams) {
        let actorView = null;
        if (UserInterface.creators[actorParams.type] !== undefined) {
            actorView = UserInterface.creators[actorParams.type](name, actorParams);
        }
        else {
            console.log("no such class: " + actorInfo.type);
        }
        return actorView;
    }

    add(actorView, pos, quat) {
        if (this.actorViews[actorView.name] === undefined) {
            actorView.userInterface = this;
            actorView.setPosition(pos);
            actorView.setRotation(quat);
            this.scene.add(actorView.mesh);
            this.actorViews[actorView.name] = actorView;            
            return true;
        }
        else {
            console.log("UserInterface: There is a actor with the same name: " + name);
            return false;
        }
    }

    setup(world) {
        this.world = world;
        this.application.setup(this);
    }

    syncActorViews(actors) {
        for (name in actors) {
            let actor = actors[name];
            if (this.actorViews[name] === undefined) {
                let actorView = UserInterface.createActorView(name, actor.actorParams);
                this.add(actorView, actor.getPosition(), actor.getRotation());
            }
            else {
                this.actorViews[name].setPosition(actor.getPosition());
                this.actorViews[name].setRotation(actor.getRotation());

                if (actor.curAnimLabel){
                    if (this.actorViews[name].curAnimLabel != actor.curAnimLabel ||
                        this.actorViews[name].curAnimFps != actor.curAnimFps) {
                        if (this.actorViews[name].playAnimation(actor.curAnimLabel, actor.curAnimFps)) {
                            this.actorViews[name].curAnimLabel = actor.curAnimLabel;
                            this.actorViews[name].curAnimFps = actor.curAnimFps;
                        }
                    }
                }
            }
        }
    }
    
    render(delta) {
        for (name in this.actorViews) {
            if (this.actorViews[name].updateAnimation !== undefined)
                this.actorViews[name].updateAnimation(delta);
        }
        
        this.application.update(delta);
        this.renderer.render(this.scene, this.camera);
    }

    request(params) {
        this.world.request(params);
    }
    
    onMessage(event) {
        this.application.onMessage(event);
    }
}

UserInterface.creators = {};

module.exports = UserInterface;
