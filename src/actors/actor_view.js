
class ActorView {
    constructor(name, actorParams) {
        this.name = name;
        this.actorParams = actorParams;
        this.userInterface = null;
        this.mesh = null;
    }

    setPosition(vec) {
        this.mesh.position.copy(vec);
    }
    
    setRotation(quat) {
        this.mesh.quaternion.copy(quat);
    }
}

module.exports = ActorView;
