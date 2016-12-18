(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./Dragger":2,"./WindowHandler":3}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
"use strict";

const Desktop = require("./Desktop");

var desk = new Desktop();

desk.initiate();

},{"./Desktop":1}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2hvbWUvdmFncmFudC8ubnZtL3ZlcnNpb25zL25vZGUvdjcuMi4xL2xpYi9ub2RlX21vZHVsZXMvd2F0Y2hpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImNsaWVudC9zb3VyY2UvanMvRGVza3RvcC5qcyIsImNsaWVudC9zb3VyY2UvanMvRHJhZ2dlci5qcyIsImNsaWVudC9zb3VyY2UvanMvV2luZG93SGFuZGxlci5qcyIsImNsaWVudC9zb3VyY2UvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IERyYWdnZXIgPSByZXF1aXJlKFwiLi9EcmFnZ2VyXCIpO1xuY29uc3QgV2luZG93SGFuZGxlciA9IHJlcXVpcmUoXCIuL1dpbmRvd0hhbmRsZXJcIik7XG5cbmNsYXNzIERlc2t0b3Age1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmRyYWdnZXIgPSBuZXcgRHJhZ2dlcigpO1xuICAgICAgICB0aGlzLndpbmRvd0hhbmRsZXIgPSBuZXcgV2luZG93SGFuZGxlcigpO1xuXG4gICAgfVxuXG4gICAgaW5pdGlhdGUoKSB7XG4gICAgICAgIHRoaXMuZHJhZ2dlci5pbml0aWF0ZSgpO1xuICAgICAgICB0aGlzLndpbmRvd0hhbmRsZXIuaW5pdGlhdGUoKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRGVza3RvcDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc2VsZWN0ZWRFbGVtZW50ID0gbnVsbDtcblxuY2xhc3MgRHJhZ2dlciB7XG5cbiAgICBpbml0aWF0ZSgpIHtcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluXCIpO1xuICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLCBkcmFnU3RhcnQsIGZhbHNlKTtcbiAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCBkcmFnT3ZlciwgZmFsc2UpO1xuICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgZHJvcCwgZmFsc2UpO1xuICAgIH1cblxufVxuXG5mdW5jdGlvbiBkcmFnU3RhcnQoZXZlbnQpIHtcblxuICAgIHNlbGVjdGVkRWxlbWVudCA9IGV2ZW50LnRhcmdldDtcbiAgICBpZiAoc2VsZWN0ZWRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImFwcC13aW5kb3dcIikpIHtcbiAgICAgICAgdmFyIHN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZXZlbnQudGFyZ2V0LCBudWxsKTtcbiAgICAgICAgdmFyIHdpbmRvd3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmFwcC13aW5kb3dcIik7XG4gICAgICAgIHdpbmRvd3MuZm9yRWFjaChmdW5jdGlvbihhcHApIHtcbiAgICAgICAgICAgIGFwcC5jbGFzc0xpc3QucmVtb3ZlKFwiZm9jdXNlZFwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2VsZWN0ZWRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJmb2N1c2VkXCIpO1xuICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YShcInRleHQvcGxhaW5cIixcbiAgICAgICAgICAgIChwYXJzZUludChzdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKFwibGVmdFwiKSwgMTApIC0gZXZlbnQuY2xpZW50WCkgKyBcIixcIiArIChwYXJzZUludChzdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKFwidG9wXCIpLCAxMCkgLSBldmVudC5jbGllbnRZKSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFnT3ZlcihldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBkcm9wKGV2ZW50KSB7XG4gICAgdmFyIG9mZnNldCA9IGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKFwidGV4dC9wbGFpblwiKS5zcGxpdChcIixcIik7XG4gICAgc2VsZWN0ZWRFbGVtZW50LnN0eWxlLmxlZnQgPSAoZXZlbnQuY2xpZW50WCArIHBhcnNlSW50KG9mZnNldFswXSwgMTApKSArIFwicHhcIjtcbiAgICBzZWxlY3RlZEVsZW1lbnQuc3R5bGUudG9wID0gKGV2ZW50LmNsaWVudFkgKyBwYXJzZUludChvZmZzZXRbMV0sIDEwKSkgKyBcInB4XCI7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRHJhZ2dlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5jbGFzcyBXaW5kb3dIYW5kbGVyIHtcblxuICAgIGluaXRpYXRlKCkge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2V0Rm9jdXMsIGZhbHNlKTtcbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gc2V0Rm9jdXMoZXZlbnQpIHtcbiAgICBjbGVhckZvY3VzKCk7XG4gICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJhcHAtd2luZG93XCIpKSB7XG4gICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiZm9jdXNlZFwiKTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLmNsYXNzTGlzdC5jb250YWlucyhcImFwcC13aW5kb3dcIikpIHtcbiAgICAgICAgZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZChcImZvY3VzZWRcIik7XG4gICAgfVxuXG59XG5cbmZ1bmN0aW9uIGNsZWFyRm9jdXMoKSB7XG4gICAgdmFyIHdpbmRvd3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmFwcC13aW5kb3dcIik7XG4gICAgd2luZG93cy5mb3JFYWNoKGZ1bmN0aW9uKGFwcCkge1xuICAgICAgICBhcHAuY2xhc3NMaXN0LnJlbW92ZShcImZvY3VzZWRcIik7XG4gICAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gV2luZG93SGFuZGxlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBEZXNrdG9wID0gcmVxdWlyZShcIi4vRGVza3RvcFwiKTtcblxudmFyIGRlc2sgPSBuZXcgRGVza3RvcCgpO1xuXG5kZXNrLmluaXRpYXRlKCk7XG4iXX0=
