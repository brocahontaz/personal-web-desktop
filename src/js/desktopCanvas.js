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
asdasd
<h1></h1>
<slot></slot>
</div>
`

let windowID = 0
let jumps = 0

export default class Desktop extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.shadowRoot.querySelector('h1').innerText = this.getAttribute('name')
  }

  addWindow () {
    windowID++
    jumps++
    const window = document.createElement('window-handler')
    window.setId = windowID
    window.jump(jumps)
    this.shadowRoot.querySelector('div').appendChild(window)
  }

  deleteWindow () {

  }

  minimizeWindow () {

  }
}

window.customElements.define('desktop-canvas', Desktop)
