//
// startup frontend.
//

let UserInterface = require("../user_interface/user_interface");
let World = require("../world/world");

class LocalApplication {
    constructor(app_ui_klass, app_klass) {
        this.userInterface = new UserInterface(app_ui_klass);
        this.world = new World(app_klass);
        this.fpsCnt = 0;
        this.deltaSum = 0;
        this.deltaMax = 0;
        this.deltaMin = 1000;
    }

    getDelta() {
        let now = Date.now();
        let delta = now - this.lastTime;
        this.lastTime = now;

        return delta;
    }

    run() {
        this.world.setup();
        this.userInterface.setup(this.world);
        requestAnimationFrame(this.update.bind(this));
    }

    update(){
        requestAnimationFrame(this.update.bind(this));

        let delta = this.getDelta();
        let delta_sec = delta / 1000.0;

        this.world.update(delta_sec);
        this.userInterface.syncActorViews(this.world.actors)
        this.userInterface.render(delta_sec);
        this.showFps(delta);
    }

    showFps(delta) {
        this.fpsCnt += 1;
        this.deltaSum += delta;

        if (delta > this.deltaMax) this.deltaMax = delta;
        if (delta < this.deltaMin) this.deltaMin = delta;

        if (this.fpsCnt > 60) {
            let avg = this.deltaSum / this.fpsCnt;
            console.log("FPS: min: " + (1000.0 / this.deltaMax).toFixed(1) +
                        ", avg: " + (1000.0 / avg).toFixed(1) +
                        ", max: " + (1000.0 / this.deltaMin).toFixed(1));

            this.fpsCnt = 0;
            this.deltaSum = 0;
            this.deltaMax = 0;
            this.deltaMin = 1000;
        }
    }
}

module.exports = LocalApplication;
