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
<slot></slot>
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
    this._chatAppSet = new window.Set()
    this._memoryAppSet = new window.Set()
    this._weatherAppSet = new window.Set()
  }

  connectedCallback () {
    this.shadowRoot.addEventListener('menuIconClick', (e) => this.addWindow(e))
    this.shadowRoot.addEventListener('displayContextMenu', (e) => this.displayContextMenu(e))
    this.shadowRoot.addEventListener('closeEvent', (e) => this.deleteWindow(e))
  }

  disconnectedCallback () {
    this.shadowRoot.removeEventListener('menuIconClick', (e) => this.addWindow(e))
    this.shadowRoot.removeEventListener('displayContextMenu', (e) => this.displayContextMenu(e))
    this.shadowRoot.removeEventListener('closeEvent', (e) => this.deleteWindow(e))
  }

  addWindow (e) {
    this.setOverlap()

    const icon = e.detail.icon
    const fullname = e.detail.fullname
    const appname = e.detail.appname

    if (parseInt(jumps) >= 20) {
      jumps = 0
      row++
    }
    // zIndex++
    windowID++
    jumps++
    const appWindow = document.createElement('window-container')
    // appWindow.id = windowID
    // appWindow.icon = icon
    // appWindow.appname = appname
    // appWindow.fullname = fullname

    appWindow.setAttribute('id', windowID)
    appWindow.setAttribute('icon', icon)
    appWindow.setAttribute('fullname', fullname)
    appWindow.setAttribute('appname', appname)
    // appWindow.zIndex = 999
    appWindow.jump(jumps, row)
    if (this.checkMaximized()) {
      appWindow.zIndex = 3
    }
    // appWindow.move((row * 100), (jumps * 10))
    this.shadowRoot.getElementById('canvas').appendChild(appWindow) /* .querySelector('div') */
    e.stopPropagation()
    e.cancelBubble = true

    this.addToList(appWindow.appname, appWindow.id)
    console.log(this._chatAppSet)
  }

  addToList (name, id) {
    console.log('ADD')
    console.log(name)
    switch (name) {
      case 'chat-application':
        this._chatAppSet.add(windowID)
        break
      case 'memory-application':
        this._memoryAppSet.add(windowID)
        break
      case 'weather-application':
        this._weatherAppSet.add(windowID)
        break
    }
  }

  removeFromList (name, id) {
    console.log('SWITCH')
    switch (name) {
      case 'chat-application':
        console.log('CASE')
        this._chatAppSet.delete(windowID)
        break
      case 'memory-application':
        this._memoryAppSet.delete(windowID)
        break
      case 'weather-application':
        this._weatherAppSet.delete(windowID)
        break
    }
  }

  displayContextMenu (e) {
    e.stopPropagation()
    e.cancelBubble = true
    console.log(e.target)
    e.target.showContext()
  }

  deleteWindow (e) {
    console.log('DElETE WINDOW' + e.detail.name)
    e.stopPropagation()
    e.cancelBubble = true
    this.removeFromList(e.detail.name, e.detail.id)
  }

  minimizeWindow () {

  }

  updateWindowTitle (windowID) {
    console.log(windowID)
    console.log(document.getElementById(windowID))
    document.getElementById(windowID).updateTitle('test')
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
