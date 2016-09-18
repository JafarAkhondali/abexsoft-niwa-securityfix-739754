let World = require('../../world/world');
let CANNON = require("../../../libs/cannon.js/build/cannon");
let Actor = require('../actor');
let SphereActorParams = require('./sphere_actor_params');

class SphereActor extends Actor {
    constructor(name, actorParams) {
	    super(name, actorParams);

        this.body = new CANNON.Body({
            mass: actorParams.mass,
            material: new CANNON.Material({
                restitution: actorParams.restitution,                
                friction: actorParams.friction,
            })
        });
        let shape = new CANNON.Sphere(actorParams.radius);
        this.body.addShape(shape);
    }

    static create(name, actorParams) {
        return new SphereActor(name, actorParams);
    }
}

World.setCreator(SphereActorParams.type, SphereActor.create);

module.exports = SphereActor;
