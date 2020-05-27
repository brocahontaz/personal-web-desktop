const template = document.createElement('template')
template.innerHTML = `
<style>
div.window {
    width: 500px;
    height: 500px;
    background-color: red;
    position: absolute;
    top: 10px;
    left: 10px;
}
div.topbar {

}
div.content {

}
</style>
<div class="window">
    <div class="topbar">

    </div>
    <div class="content"></div>
</div>
`

let windowID = 0

export default class DesktopWindow extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    /* console.log(windowID) */
  }

  setId (id) {
    windowID = id
    console.log(windowID)
  }

  jump (step) {
    const window = this.shadowRoot.querySelector('.window')
    const topMargin = window.style.top
    const leftMargin = window.style.left
    console.log(topMargin)
    console.log(this.shadowRoot.querySelector('.window').style.top)
    if (parseInt(topMargin) <= 100 && parseInt(leftMargin <= 100)) {
      window.style.top = (topMargin + 100) + 'px'
      window.style.left = (leftMargin + 100) + 'px'
    }
    console.log(window.style.top)
  }
}

window.customElements.define('desktop-window', DesktopWindow)
