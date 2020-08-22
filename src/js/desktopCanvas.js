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

div.contextMenu {
  position: absolute;
  top: -150px;
  width: 200px;
  height: 150px;
  background: rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid #000000;
  display: none;
  cursor: auto;
}

ul.contextList {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

ul.contextList li {
    font-size: 0.9rem;
    margin: 0;
    padding: 0;
    /*display: flex;
    flex-direction: row;*/
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

/**
 *
 *
 * @export
 * @class Desktop
 * @extends {window.HTMLElement}
 */
export default class Desktop extends window.HTMLElement {
  /**
   *Creates an instance of Desktop.
   * @memberof Desktop
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    /* this.shadowRoot.querySelector('h1').innerText = this.getAttribute('name') */
    this._chatAppSet = new window.Set()
    this._memoryAppSet = new window.Set()
    this._weatherAppSet = new window.Set()
  }

  /**
   *
   *
   * @memberof Desktop
   */
  connectedCallback () {
    this.shadowRoot.addEventListener('menuIconClick', (e) => this.addWindow(e))
    this.shadowRoot.addEventListener('displayContextMenu', (e) => this.displayContextMenu(e))
    this.shadowRoot.addEventListener('closeEvent', (e) => this.deleteWindow(e))
    this.shadowRoot.addEventListener('closeAll', (e) => this.closeAll(e))
    this.shadowRoot.addEventListener('minimizeAll', (e) => this.minimizeAll(e))
    this.shadowRoot.addEventListener('restoreWindow', (e) => this.restoreWindow(e))
  }

  /**
   *
   *
   * @memberof Desktop
   */
  disconnectedCallback () {
    this.shadowRoot.removeEventListener('menuIconClick', (e) => this.addWindow(e))
    this.shadowRoot.removeEventListener('displayContextMenu', (e) => this.displayContextMenu(e))
    this.shadowRoot.removeEventListener('closeEvent', (e) => this.deleteWindow(e))
    this.shadowRoot.removeEventListener('closeAll', (e) => this.closeAll(e))
    this.shadowRoot.removeEventListener('minimizeAll', (e) => this.minimizeAll(e))
    this.shadowRoot.addEventListener('restoreWindow', (e) => this.restoreWindow(e))
  }

  /**
   *
   *
   * @param {*} e
   * @memberof Desktop
   */
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
    appWindow.focus()
    e.stopPropagation()
    e.cancelBubble = true

    this.addToList(appWindow.appname, appWindow.id)
    console.log(this._chatAppSet)
  }

  /**
   *
   *
   * @param {*} name
   * @param {*} id
   * @memberof Desktop
   */
  addToList (name, id) {
    console.log('ADD')
    console.log(name)
    switch (name) {
      case 'chat-application':
        this._chatAppSet.add(id)
        break
      case 'memory-application':
        this._memoryAppSet.add(id)
        break
      case 'weather-application':
        this._weatherAppSet.add(id)
        break
    }
  }

  /**
   *
   *
   * @param {*} name
   * @param {*} id
   * @memberof Desktop
   */
  removeFromList (name, id) {
    console.log('SWITCH')
    switch (name) {
      case 'chat-application':
        console.log('CASE')
        this._chatAppSet.delete(id)
        break
      case 'memory-application':
        this._memoryAppSet.delete(id)
        break
      case 'weather-application':
        this._weatherAppSet.delete(id)
        break
    }
  }

  /**
   *
   *
   * @param {*} name
   * @returns
   * @memberof Desktop
   */
  getList (name) {
    console.log(name)
    switch (name) {
      case 'chat-application':
        console.log('CASE')
        return this._chatAppSet
      case 'memory-application':
        return this._memoryAppSet
      case 'weather-application':
        return this._weatherAppSet
    }
  }

  /**
   *
   *
   * @param {*} e
   * @memberof Desktop
   */
  displayContextMenu (e) {
    e.stopPropagation()
    e.cancelBubble = true
    console.log(e.target)
    console.log(this.getList(e.detail.appname))
    e.target.showContext(e, this.getList(e.detail.appname))
  }

  /**
   *
   *
   * @param {*} e
   * @memberof Desktop
   */
  deleteWindow (e) {
    console.log('DElETE WINDOW' + e.detail.name)
    e.stopPropagation()
    e.cancelBubble = true
    this.removeFromList(e.detail.name, e.detail.id)
  }

  minimizeWindow (e) {

  }

  /**
   *
   *
   * @param {*} e
   * @memberof Desktop
   */
  restoreWindow (e) {
    e.stopPropagation()
    e.cancelBubble = true
    const windowID = e.detail.id
    console.log(windowID)
    this.shadowRoot.getElementById(windowID).restoreWindow()
  }

  /**
   *
   *
   * @param {*} e
   * @memberof Desktop
   */
  closeAll (e) {
    console.log(e)
    e.stopPropagation()
    e.cancelBubble = true
    const name = e.detail.appname
    const list = this.getList(name)
    list.forEach(element => {
      this.removeFromList(name, element)
      this.shadowRoot.getElementById(element).remove()
    })
  }

  /**
   *
   *
   * @param {*} e
   * @memberof Desktop
   */
  minimizeAll (e) {
    e.stopPropagation()
    e.cancelBubble = true
    const name = e.detail.appname
    const list = this.getList(name)
    list.forEach(element => {
      this.shadowRoot.getElementById(element).minimizeWindow()
    })
  }

  /**
   *
   *
   * @param {*} windowID
   * @memberof Desktop
   */
  updateWindowTitle (windowID) {
    console.log(windowID)
    console.log(document.getElementById(windowID))
    document.getElementById(windowID).updateTitle('test')
  }

  /**
   *
   *
   * @memberof Desktop
   */
  setOverlap () {
    if (this.shadowRoot.getElementById('canvas').hasChildNodes()) {
      for (let i = 0; i < this.shadowRoot.getElementById('canvas').children.length; i++) {
        if (!this.shadowRoot.getElementById('canvas').children[i].isMaximized) {
          this.shadowRoot.getElementById('canvas').children[i].zIndex = 1
        }
      }
    }
  }

  /**
   *
   *
   * @returns
   * @memberof Desktop
   */
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
