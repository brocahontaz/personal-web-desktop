"use strict";

class WindowHandler {

    initiate() {
        document.addEventListener("click", setFocus, false);
    }

}

function setFocus(event) {
    clearFocus();
    if (event.target.classList.contains("app-window")) {
        event.target.classList.add("focused");
    } else if (event.target.parentNode.classList.contains("app-window")) {
        event.target.parentNode.classList.add("focused");
    }

}

function clearFocus() {
    var windows = document.querySelectorAll(".app-window");
    windows.forEach(function(app) {
        app.classList.remove("focused");
    });
}

module.exports = WindowHandler;
