"use strict";

var selectedElement = null;

class Dragger {

    initiate() {
        var container = document.querySelector("main");
        container.addEventListener("dragstart", dragStart, false);
        container.addEventListener("dragover", dragOver, false);
        container.addEventListener("drop", drop, false);
    }

}

function dragStart(event) {

    selectedElement = event.target;
    if (selectedElement.classList.contains("app-window")) {
        var style = window.getComputedStyle(event.target, null);
        var windows = document.querySelectorAll(".app-window");
        windows.forEach(function(app) {
            app.classList.remove("focused");
        });

        selectedElement.classList.add("focused");
        event.dataTransfer.setData("text/plain",
            (parseInt(style.getPropertyValue("left"), 10) - event.clientX) + "," + (parseInt(style.getPropertyValue("top"), 10) - event.clientY));
    }
}

function dragOver(event) {
    event.preventDefault();
    return false;
}

function drop(event) {
    var offset = event.dataTransfer.getData("text/plain").split(",");
    selectedElement.style.left = (event.clientX + parseInt(offset[0], 10)) + "px";
    selectedElement.style.top = (event.clientY + parseInt(offset[1], 10)) + "px";
    event.preventDefault();
    return false;
}

module.exports = Dragger;
