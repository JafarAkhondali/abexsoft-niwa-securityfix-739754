class Actor {
    constructor(name, actorParams) {
        this.name = name;
        this.actorParams = actorParams;
        this.world = null;
        this.body = null;
    }

    setPosition(vec) {
        this.body.position.copy(vec);
    }

    setInterpolatePosition(vec) {
        let interPos = (getPosition() + vec) / 2;
        this.body.position.copy(interPos);
    }

    setRotation(quat) {
        this.body.quaternion.copy(quat);
    }

    setLinearVelocity(vec) {
        this.body.velocity.copy(vec);
    }

    getPosition() {
        return this.body.position;
    }

    getRotation() {
        return this.body.quaternion;
    }

    getLinearVelocity() {
        return this.body.velocity;
    }

    update(delta) {
    }

    applyLocalImpulse(imp, localPoint) {
        this.body.applyLocalImpulse(imp, localPoint);
    }
}

module.exports = Actor;
