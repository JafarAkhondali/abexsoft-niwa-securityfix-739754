let World = require('../../world/world');
let CANNON = require("../../../libs/cannon.js/build/cannon");
let Actor = require('../actor');
let SkyBoxActorParams = require('./sky_box_actor_params');

class SkyBoxActor extends Actor {
    constructor(name, actorParams) {
        super(name, actorParams);

        this.body = new CANNON.Body();
        let shape = new CANNON.Sphere(1);
        this.body.addShape(shape);
    }

    static create(name, actorParams) {
        return new SkyBoxActor(name, actorParams);
    }
}

World.setCreator(SkyBoxActorParams.type, SkyBoxActor.create);

module.exports = SkyBoxActor;
