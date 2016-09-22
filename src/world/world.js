let Vector3D = require("../math/vector3d");
let CANNON = require("../../libs/cannon.js/build/cannon");

class World {
    constructor(app_klass) {
        this.app = new app_klass(this);

        this.physicsWorld = new CANNON.World();
        this.physicsWorld.gravity.set(0.0, -9.8, 0.0)
        this.fixedTimeStep = 1.0 / 60.0; // seconds
        this.maxSubSteps = 3;
        
        this.defaultShadow = false;
        this.actorNum = 0;
        this.actors = {};
    }

    static setCreator(type, creator) {
        World.creators[type] = creator;
    }
    
    static createActor(name, actorParams) {
        let actor = null;
        if (World.creators[actorParams.type] !== undefined) {
            actor = World.creators[actorParams.type](name, actorParams);    
        }
        else {
            console.log("No such actor type: " + actorParams.type);
        }
        return actor;
    }
    
    setup() {
        this.app.setup();
    }

    add(actor) {
        if (this.actors[actor.name] === undefined) {
            this.actors[actor.name] = actor;
            actor.world = this;

            if (actor.body && actor.actorParams.usePhysics)
                this.physicsWorld.add(actor.body);
            
            return true;
        }
        else {
            console.log("There is a object with the same name: " + name);
            return false;
        }        
    }
    
    update(delta) {
        this.physicsWorld.step(this.fixedTimeStep, delta, this.maxSubSteps);

        for (name in this.actors) {
            this.actors[name].update(delta);
        }        

        this.app.update(delta);
    };

    request(params) {
        //console.log("request: " + params.func + ", " + params.options);
        this.app[params.func](params.options);
    }
    
    getActorsForSending() {
        var actors = {};
        
        for(key in this.actors) {
            var actor = {};
            
            // TODO: create a method of copying values in each actor class.
            
            // actorInfo
            actor.actorInfo = this.actors[key].actorInfo;
            
            // transform
            var transform = this.actors[key].getTransform();
            actor.transform = new exports.Transform(
                exports.Vector3D.createFromAmmo(transform.getOrigin()),
                exports.Quaternion.createFromAmmo(transform.getRotation()));
            
            // linearVelocity
            var linearVelocity = this.actors[key].getLinearVelocity();
            actor.linearVelocity = new exports.Vector3D.createFromAmmo(linearVelocity);

            // Animation
            if (this.actors[key].curAnimLabel){
                actor.curAnimLabel = this.actors[key].curAnimLabel;
                actor.curAnimFps = this.actors[key].curAnimFps;                    
            }
            
            actors[key] = actor;
        }
        
        return actors;
    }

    merge(actors) {
        for (name in actors) {
            if (this.actors[name] === undefined){
                this.actors[name] = this.createActor(name, actors[name].actorInfo);
            }
            
            var transform = actors[name].transform;
            this.actors[name].setInterpolatePosition(transform.position);
            //this.actors[name].setPosition(transform.position);
            this.actors[name].setRotation(transform.rotation);
            
            this.actors[name].setLinearVelocity(actors[name].linearVelocity);

            if (actors[name].curAnimLabel){
                this.actors[name].curAnimLabel = actors[name].curAnimLabel;
                this.actors[name].curAnimFps = actors[name].curAnimFps;
            }
        }
    }    
}

World.creators = {};

module.exports = World;


