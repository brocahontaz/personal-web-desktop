const template = document.createElement('template')
template.innerHTML = `
<style>
div#canvas {
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  background-color: black;
  background-image: url('../image/bg.jpg');
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  position: relative;
  z-index: 0;
  overflow: hidden;
}
h1 {
  color: red;
}
</style>
<div id="canvas">
</div>
`

let windowID = 0
let jumps = 0
let row = 0
// let zIndex = 1

export default class Desktop extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    /* this.shadowRoot.querySelector('h1').innerText = this.getAttribute('name') */
  }

  addWindow () {
    this.setOverlap()

    if (parseInt(jumps) >= 20) {
      jumps = 0
      row++
    }
    // zIndex++
    windowID++
    jumps++
    const appWindow = document.createElement('window-container')
    appWindow.setId = windowID
    // appWindow.zIndex = 999
    appWindow.jump(jumps, row)
    if (this.checkMaximized()) {
      appWindow.zIndex = 3
    }
    // appWindow.move((row * 100), (jumps * 10))
    this.shadowRoot.getElementById('canvas').appendChild(appWindow) /* .querySelector('div') */
  }

  deleteWindow () {

  }

  minimizeWindow () {

  }

  setOverlap () {
    if (this.shadowRoot.getElementById('canvas').hasChildNodes()) {
      for (let i = 0; i < this.shadowRoot.getElementById('canvas').children.length; i++) {
        if (!this.shadowRoot.getElementById('canvas').children[i].isMaximized) {
          this.shadowRoot.getElementById('canvas').children[i].zIndex = 1
        }
      }
    }
  }

  checkMaximized () {
    if (this.shadowRoot.getElementById('canvas').hasChildNodes()) {
      for (let i = 0; i < this.shadowRoot.getElementById('canvas').children.length; i++) {
        // console.log(this.shadowRoot.getElementById('canvas').children[i].isMaximized)
        if (this.shadowRoot.getElementById('canvas').children[i].isMaximized) {
          return true
        }
      }
      return false
    }
  }
}

window.customElements.define('desktop-canvas', Desktop)
