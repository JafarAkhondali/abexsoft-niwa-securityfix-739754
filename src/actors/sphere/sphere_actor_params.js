class SphereActorParams {
    constructor(radius) {
        this.radius = radius;
        this.type = SphereActorParams.type;

        // physics params
        this.usePhysics = true;
        this.mass = 0;
        this.restitution = 0.2;
        this.friction = 1.0;
        this.linearDamping = 0.0;
        this.angularDamping = 0.0;
        this.collisionFilter = null;

        // visual params
        this.textureName = null;
    }
}

SphereActorParams.type = "sphere";

module.exports = SphereActorParams;
