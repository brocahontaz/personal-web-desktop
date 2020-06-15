const template = document.createElement('template')
template.innerHTML = `
<style>
div#canvas {
  width: 100%;
  height: 100%;
  background-color: black;
  background-image: url('../image/bg.jpg');
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  z-index: 0;
}
h1 {
  color: red;
}
</style>
<div id="canvas">
<slot></slot>
<slot></slot>
<slot></slot>
</div>
`

let windowID = 0
let jumps = 0
let row = 0

export default class Desktop extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    /* this.shadowRoot.querySelector('h1').innerText = this.getAttribute('name') */
  }

  addWindow () {
    if (parseInt(jumps) >= 20) {
      jumps = 0
      row++
    }

    windowID++
    jumps++
    const appWindow = document.createElement('window-container')
    appWindow.setId = windowID
    appWindow.jump(jumps, row)
    this.shadowRoot.appendChild(appWindow) /* .querySelector('div') */
  }

  deleteWindow () {

  }

  minimizeWindow () {

  }
}

window.customElements.define('desktop-canvas', Desktop)
