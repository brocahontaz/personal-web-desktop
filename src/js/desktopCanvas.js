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

/**
 * Webcomponent module for the desktop canvas.
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

    this._chatAppSet = new window.Set()
    this._memoryAppSet = new window.Set()
    this._weatherAppSet = new window.Set()
  }

  /**
   * Connected callback, called when element is created
   * Adding event listeners etc
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
   * Disconnected callback, called when element is destroyed
   * Removing event listeners etc
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
   * Add a new window
   *
   * @param {Event} e the event
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

    windowID++
    jumps++

    const appWindow = document.createElement('window-container')

    appWindow.setAttribute('id', windowID)
    appWindow.setAttribute('icon', icon)
    appWindow.setAttribute('fullname', fullname)
    appWindow.setAttribute('appname', appname)

    appWindow.jump(jumps, row)
    if (this.checkMaximized()) {
      appWindow.zIndex = 3
    }

    this.shadowRoot.getElementById('canvas').appendChild(appWindow)
    appWindow.focus()
    e.stopPropagation()
    e.cancelBubble = true

    this.addToList(appWindow.appname, appWindow.id)
  }

  /**
   * Add a window to list of open windows
   *
   * @param {String} name the name of the application
   * @param {int} id the id of the window
   * @memberof Desktop
   */
  addToList (name, id) {
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
   * Remove window from the list of open windows
   *
   * @param {String} name the name of the application
   * @param {int} id the id of the window
   * @memberof Desktop
   */
  removeFromList (name, id) {
    switch (name) {
      case 'chat-application':
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
   * Get the list of open windows for an application
   *
   * @param {String} name the name of the application
   * @returns
   * @memberof Desktop
   */
  getList (name) {
    switch (name) {
      case 'chat-application':
        return this._chatAppSet
      case 'memory-application':
        return this._memoryAppSet
      case 'weather-application':
        return this._weatherAppSet
    }
  }

  /**
   * Display the context menu of an application
   *
   * @param {*} e
   * @memberof Desktop
   */
  displayContextMenu (e) {
    e.stopPropagation()
    e.cancelBubble = true
    e.target.showContext(e, this.getList(e.detail.appname))
  }

  /**
   * Delete/remove/close a window
   *
   * @param {Event} e the event
   * @memberof Desktop
   */
  deleteWindow (e) {
    e.stopPropagation()
    e.cancelBubble = true
    this.removeFromList(e.detail.name, e.detail.id)
  }

  /**
   * Restore a window from minimized
   *
   * @param {Event} e the event
   * @memberof Desktop
   */
  restoreWindow (e) {
    e.stopPropagation()
    e.cancelBubble = true
    const windowID = e.detail.id
    this.shadowRoot.getElementById(windowID).restoreWindow()
  }

  /**
   * Close all windows of an application
   *
   * @param {Event} e the event
   * @memberof Desktop
   */
  closeAll (e) {
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
   * Minimize all windows of an application
   *
   * @param {Event} e the event
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
   * Helper method for setting proper overlap of windows, if any window is maximized
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
   * Check if any window is maximized
   *
   * @returns true if maximized, false otherwise
   * @memberof Desktop
   */
  checkMaximized () {
    if (this.shadowRoot.getElementById('canvas').hasChildNodes()) {
      for (let i = 0; i < this.shadowRoot.getElementById('canvas').children.length; i++) {
        if (this.shadowRoot.getElementById('canvas').children[i].isMaximized) {
          return true
        }
      }
      return false
    }
  }
}

window.customElements.define('desktop-canvas', Desktop)
