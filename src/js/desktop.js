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
}
h1 {
  color: red;
}
</style>
<div id="canvas">
asdasd
<h1></h1>
</div>
`

export default class Desktop extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.shadowRoot.querySelector('h1').innerText = this.getAttribute('name')
  }
}

window.customElements.define('desktop-canvas', Desktop)
