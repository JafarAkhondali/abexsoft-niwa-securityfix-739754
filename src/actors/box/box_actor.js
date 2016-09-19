let World = require('../../world/world');
let CANNON = require("../../../libs/cannon.js/build/cannon");
let Actor = require('../actor');
let BoxActorParams = require('./box_actor_params');

class BoxActor extends Actor {
    constructor(name, actorParams) {
        super(name, actorParams);

        this.body = new CANNON.Body({
            mass: actorParams.mass,
            material: new CANNON.Material({
                restitution: actorParams.restitution,
                friction: actorParams.friction,
            })
        });
        let shape = new CANNON.Box(actorParams.halfExtents);
        this.body.addShape(shape);
    }

    static create(name, actorParams) {
        return new BoxActor(name, actorParams);
    }
}

World.setCreator(BoxActorParams.type, BoxActor.create);

module.exports = BoxActor;
