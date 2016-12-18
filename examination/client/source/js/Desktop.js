"use strict";

const Dragger = require("./Dragger");
const WindowHandler = require("./WindowHandler");

class Desktop {
    constructor() {
        this.dragger = new Dragger();
        this.windowHandler = new WindowHandler();

    }

    initiate() {
        this.dragger.initiate();
        this.windowHandler.initiate();
    }
}

module.exports = Desktop;
