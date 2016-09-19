class SkyBoxActorParams {
    constructor(materials) {
        this.materials = materials;
        this.type = SkyBoxActorParams.type;

        // physics params
        this.usePhysics = false;
    }
}

SkyBoxActorParams.type = "sky_box";

module.exports = SkyBoxActorParams;
