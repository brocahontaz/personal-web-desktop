const template = document.createElement('template')
template.innerHTML = `
<head>
<link rel="stylesheet" href="../css/font-awesome-4.7.0/css/font-awesome.css">
<style>
div.windowContainer {
    width: 500px;
    height: 500px;
    /*background: rgba(128, 128, 128, 0.5);*/
    border-radius: 7px 7px 0px 0px;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 1;
    border: 1px solid #adadad;

    /*transition: top .5s 0s cubic-bezier(.1, 1.2, .3, 1), left .5s, width .5s .5s cubic-bezier(.1, 1.2, .3, 1), opacity .3s, visibility .5s;*/
}
div.windowContainer .maximized {

}

div.windowContainer.minimized {
  /*top: 100%;*/
  left: 0;
  visibility: hidden;
  transition: top .5s 0s cubic-bezier(.1, 1.2, .3, 1), transform .5s 0s cubic-bezier(.1, 1.2, .3, 1), width .5s .5s cubic-bezier(.1, 1.2, .3, 1), opacity .3s;
}

div.windowContainer .topbar {
    display: grid;
    grid-template-columns: 80% 20%;
    width: 100%;
    height: 30px;
    background: rgba(64, 64, 64, 0.5);
    border-radius: 7px 7px 0px 0px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
}
div.windowContainer .topbar .applicationHeader {
    display: flex;
    align-items: center;
    grid-column-start: 1;
    grid-column-end: 1;
    font-size: 0.8rem;
    color: #ffffff;
    font-weight: 800;
    user-select: none;
}
div.windowContainer .topbar .windowButtons {
  display: flex;
  align-items: center;
  justify-self: right;
  grid-column-start: 2;
  grid-column-end: 2;
  margin-right: 10px;
  color: #ffffff;
}

div.windowContainer .topbar .windowButtons i {
  margin-left: 0px;
}

div.content {
  position: absolute;
  top: 30px;
  width: 100%;
  height: calc(100% - 30px);
  background: rgba(128, 128, 128, 0.5);
  /*border-radius: 0px 0px 7px 7px;*/
}

span.applicationName {
  margin-left: 5px;
}

img.applicationIcon {
  height: 20px;
  margin-left: 10px;
  font-size: 0.7rem;
}

button {
  height: 24px;
  width: 24px;
  background-color: rgba(0,0,0,0);
  box-shadow: 0px 0px 0px transparent;
  border: 0px solid transparent;
  border-radius: 12px;
  text-shadow: 0px 0px 0px transparent;
  padding: 0;
  margin: 0;
  color: #ffffff;
  text-align: center;
  font-size: 0.7rem;
}

button:focus {
  background-color: rgba(255,255,255, 0);
  box-shadow: 0px 0px 0px transparent;
  border: 0px solid transparent;
  outline: 0;
  text-shadow: 0px 0px 0px transparent;
  padding: 0;
  color: #ffffff;
  text-align: center;
}

button:hover {
  background-color: rgba(0,0,0, 0.5);
}

button:active {
  background-color: rgba(255,255,255, 0.5);
}
</style>
</head>
<div class="windowContainer" id='0'>
    <div class="topbar">
      <div class="applicationHeader">
        <img src="/image/monster.png" class="applicationIcon">
        <span class="applicationName"></span>
        <span class="applicationTitle"></span>
      </div>
      <div class="windowButtons">
        <button id="minButton"><i class="fa fa-window-minimize"></i></button>
        <button id="maxButton"><i class="fa fa-window-maximize"></i></button>
        <button id="closeButton"><i class="fa fa-times"></i></button>   
      </div>
    </div>
    <div class="content">
        
    </div>
</div>
`
/*
let windowID = 0
let zIndex = 1
let active = false
let initialY
let initialX
let currentY
let currentX
let yOffset = 0
let xOffset = 0 */

export default class WindowContainer extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    /* console.log(windowID) */
    /* this.shadowRoot.addEventListener('click', () => this.dragStart(), false) */
    this._zIndex = 1
    this._active = false
    this._initialY = 0
    this._initialX = 0
    this._currentY = 0
    this._currentX = 0
    this._yOffset = 0
    this._xOffset = 0
    this._maximized = false
    this._restoreWidth = 500
    this._restoreHeight = 500
    this._windowID = this.getAttribute('id')
    this._icon = this.getAttribute('icon')
    this._fullname = this.getAttribute('fullname')
    this._appname = this.getAttribute('appname')
    this._closeEvent = new window.CustomEvent('closeEvent', {
      bubbles: true,
      cancelable: true,
      detail: { id: this._windowID, name: this._appname }
    })

    this.shadowRoot.querySelector('.applicationIcon').setAttribute('src', this._icon)
    this.shadowRoot.querySelector('.applicationName').innerHTML = this._name
  }

  connectedCallback () {
    // Make focusable
    this.tabIndex = 1
    this.setAttribute('tabindex', 1)
    console.log('connected window')

    // Subscribe to event listeners
    this.subscribeListeners()
  }

  disconnectedCallback () {
    // Unsubscribe to event listeners
    this.unsubscribeListeners()
  }

  attributeChangedCallback (name, oldValue, newValue) {
    this.updateApp()
  }

  static get observedAttributes () { return ['id', 'icon', 'fullname', 'appname'] }

  set id (id) {
    this._windowID = id
    /* .log('TESTID' + this.shadowRoot.querySelector('div.window').id) */
    this.shadowRoot.querySelector('div.windowContainer').id = this._windowID
    /* console.log(windowID) */

    this._closeEvent = new window.CustomEvent('closeEvent', {
      bubbles: true,
      cancelable: true,
      detail: { id: this._windowID, name: this._appname }
    })
  }

  get id () {
    return this._windowID
  }

  set zIndex (index) {
    this._zIndex = index
    this.shadowRoot.querySelector('div.windowContainer').style.zIndex = this._zIndex
  }

  get zIndex () {
    return this._zIndex
  }

  get appname () {
    return this._appname
  }

  get fullname () {
    return this._fullname
  }

  get isMaximized () {
    return this._maximized
  }

  updateApp () {
    this._windowID = this.getAttribute('id')
    this._icon = this.getAttribute('icon')
    this._fullname = this.getAttribute('fullname')
    this._appname = this.getAttribute('appname')
    console.log()
    this.shadowRoot.querySelector('.applicationIcon').setAttribute('src', this._icon)
    this.shadowRoot.querySelector('.applicationName').innerHTML = this._fullname
    const app = document.createElement(this._appname)
    /* app.setAttribute('windowID', this.id) */
    this.shadowRoot.querySelector('div.content').appendChild(app)
    this._closeEvent = new window.CustomEvent('closeEvent', {
      bubbles: true,
      cancelable: true,
      detail: { id: this._windowID, name: this._appname }
    })
  }

  updateTitle (e) {
    this.shadowRoot.querySelector('.applicationTitle').innerText = ' - ' + e.detail.title
    e.stopPropagation()
    e.cancelBubble = true
  }

  jump (step, row) {
    const desktopWindow = this.shadowRoot.querySelector('div.windowContainer')
    // const desktopWindowStyles = window.getComputedStyle(desktopWindow, null)
    // desktopWindow.style.top = '10px'
    // desktopWindow.style.left = '10px'
    // const topMargin = desktopWindow.style.top
    // const leftMargin = desktopWindow.style.left
    // console.log(topMargin + ' - ' + leftMargin)
    // console.log(this.shadowRoot.querySelector('div.windowContainer').id)

    if (parseInt(step) <= 20) {
      const yPos = `${(step * 10)}px`
      const xPos = `${(step * 10) + (row * 100)}px`
      this._initialX = (step * 10) + (row * 100)
      this._initialY = (step * 10)
      this._currentX = (step * 10) + (row * 100)
      this._currentY = (step * 10)
      this._xOffset = (step * 10) + (row * 100)
      this._yOffset = (step * 10)

      desktopWindow.style.transform = 'translate3d(' + xPos + ', ' + yPos + ', 0)'
      // console.log(`${parseInt(topMargin) + (step * 10)}px`)

      // console.log('IFIFIFIF')
    }
    // console.log(desktopWindow.style.top)
  }

  focusWindow () {
    /* document.body.querySelector('window-handler').shadowRoot.querySelector('div.window').style.background = 'rgba(178, 178, 178, 0.5)' */
    this.shadowRoot.querySelector('div.windowContainer').style.background = 'rgba(128, 128, 128, 0.9)'
    this.zIndex = 999
    console.log('Z: ' + this.shadowRoot.querySelector('div.windowContainer').zIndex)
    console.log(this.zIndex)
  }

  unFocusWindow () {
    if (!this._maximized) {
      this.shadowRoot.querySelector('div.windowContainer').style.background = 'rgba(128, 128, 128, 0.5)'
      this.zIndex = 1
    } else {
      this.zIndex = 2
    }

    console.log(this.zIndex)
  }

  dragStart (e) {
    console.log(this._maximized)
    if (!this._maximized) {
      this.shadowRoot.querySelector('div.topbar').style.cursor = 'grabbing'
      this._active = true
      /* console.log(e) */
      e = e || window.event
      /* e.preventDefault() */
      console.log('VÄRSTA DRAGET UNTZ UNTZ')
      this._initialX = e.clientX - this._xOffset
      this._initialY = e.clientY - this._yOffset
      console.log(this._initialX + '-' + this._initialY)
    }
  }

  drag (e) {
    if (this._active && !this._maximized) {
      e = e || window.event
      /* e.preventDefault() */
      this._currentY = e.clientY - this._initialY
      this._currentX = e.clientX - this._initialX

      this._yOffset = this._currentY
      this._xOffset = this._currentX

      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

      if (e.clientY <= 0 || e.clientY >= vh || e.clientX <= 0 || e.clientX >= vw + 10) {
        // this.dragStop(e)
        this._yOffset = 0
        this._xOffset = 0
      }

      this.move(this._currentX, this._currentY)

      console.log(e.clientX + '-' + e.clientY)
    }
  }

  dragStop (e) {
    if (!this._maximized) {
      this.shadowRoot.querySelector('div.topbar').style.cursor = 'auto'
      console.log('DRAGET ÄR ÖVER')
      this._active = false
      this._initialY = this._currentY
      this._initialX = this._currentX
      // this._yOffset = this._currentY
      // this._xOffset = this._currentX
    }
  }

  move (xPos, yPos) {
    console.log('MOVEIT MOVEIT')
    /* const desktopWindow = this.shadowRoot.querySelector('div.window') */
    const desktopWindow = this.shadowRoot.querySelector('div.windowContainer')
    // console.log(desktopWindow.style.top)
    /* desktopWindow.style.top = yPos + 'px'
    desktopWindow.style.left = xPos + 'px' */

    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

    const boundaryTop = 0
    const boundaryBottom = vh - 80
    const boundaryRight = vw - (this._restoreWidth / 2)
    const boundaryLeft = 0 - this._restoreWidth / 2
    /*
    if (yPos > boundaryBottom) {
      console.log('hejhejhej')
      desktopWindow.style.transform = 'translate3d(' + xPos + 'px, ' + boundaryBottom + 'px, 0)'
    } else if (xPos < boundaryLeft) {
      desktopWindow.style.transform = 'translate3d(' + boundaryLeft + 'px, ' + yPos + 'px, 0)'
    } else if (xPos > boundaryRight) {
      desktopWindow.style.transform = 'translate3d(' + boundaryRight + 'px, ' + yPos + 'px, 0)'
    } else if {} */

    if (yPos > boundaryTop && yPos <= boundaryBottom && xPos >= boundaryLeft && xPos <= boundaryRight) {
      desktopWindow.style.transform = 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0)'
    } else {
      // this.dragStop()
    }

    /* desktopWindow.style.transform = 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0)' */
  }

  closeWindow (e) {
    this.dispatchEvent(this._closeEvent)
    this.remove()
  }

  maximizeWindowToggle (e) {
    if (!this._maximized) {
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

      // this.shadowRoot.querySelector('div.windowContainer').style.left = 0
      // this.shadowRoot.querySelector('div.windowContainer').style.top = 0
      this.shadowRoot.querySelector('div.windowContainer').style.transform = 'translate3d(' + 0 + 'px, ' + 0 + 'px, 0)'
      this.shadowRoot.querySelector('div.windowContainer').style.borderRadius = 0
      this.shadowRoot.querySelector('div.windowContainer').style.border = 0
      this.shadowRoot.querySelector('div.topbar').style.borderRadius = 0

      this.shadowRoot.querySelector('div.windowContainer').style.height = (vh - 50) + 'px'
      this.shadowRoot.querySelector('div.windowContainer').style.width = vw + 'px'

      // this._initialY = 0
      // this._initialX = 0
      // this._yOffset = 0
      // this._xOffset = 0
      this._maximized = true
      this.zIndex = 999
    } else {
      this.shadowRoot.querySelector('div.windowContainer').style.borderRadius = '7px 7px 2px 2px'
      this.shadowRoot.querySelector('div.windowContainer').style.border = '1px solid #adadad'
      this.shadowRoot.querySelector('div.topbar').style.borderRadius = '7px 7px 0px 0px'
      this.shadowRoot.querySelector('div.windowContainer').style.height = this._restoreHeight + 'px'
      this.shadowRoot.querySelector('div.windowContainer').style.width = this._restoreWidth + 'px'
      this.shadowRoot.querySelector('div.windowContainer').style.transform = 'translate3d(' + this._initialX + 'px, ' + this._initialY + 'px, 0)'
      this._maximized = false
      // this.zIndex = 1
    }
  }

  minimizeWindow (e) {
    /* const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) */
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    console.log('MINI')
    this.shadowRoot.querySelector('div.windowContainer').classList.add('minimized')
    this.shadowRoot.querySelector('div.windowContainer').style.transform = 'translate3d(' + 0 + 'px, ' + vh + 'px, 0)'
  }

  subscribeListeners () {
    // Add eventlisteners for focus
    this.addEventListener('focus', () => this.focusWindow(), false)
    this.addEventListener('blur', () => this.unFocusWindow(), false)

    // Add eventlisteners for drag
    this.shadowRoot.querySelector('div.applicationHeader').addEventListener('mousedown', (e) => this.dragStart(e), false)
    document.addEventListener('mousemove', (e) => this.drag(e), false)
    this.shadowRoot.querySelector('div.applicationHeader').addEventListener('mouseup', (e) => this.dragStop(e), false)

    // Add eventlisteners for action buttons
    this.shadowRoot.getElementById('closeButton').addEventListener('click', (e) => this.closeWindow(e), false)
    this.shadowRoot.getElementById('maxButton').addEventListener('click', (e) => this.maximizeWindowToggle(e), false)
    this.shadowRoot.getElementById('minButton').addEventListener('click', (e) => this.minimizeWindow(e), false)

    this.shadowRoot.addEventListener('titleUpdate', (e) => this.updateTitle(e))
  }

  unsubscribeListeners () {
    // Remove eventlisteners for focus
    this.shadowRoot.removeEventListener('focus', () => this.focusWindow())
    this.removeEventListener('blur', () => this.unFocusWindow())

    // Remove eventlisteners for drag
    this.shadowRoot.querySelector('div.applicationHeader').removeEventListener('mousedown', (e) => this.dragStart(e))
    document.removeEventListener('mousemove', (e) => this.drag(e))
    this.shadowRoot.querySelector('div.applicationHeader').removeEventListener('mouseup', (e) => this.dragStop(e))

    // Remove eventlisteners for action buttons
    this.shadowRoot.getElementById('closeButton').removeEventListener('click', (e) => this.closeWindow(e))
    this.shadowRoot.getElementById('maxButton').removeEventListener('click', (e) => this.maximizeWindowToggle(e), false)
    this.shadowRoot.getElementById('minButton').removeEventListener('click', (e) => this.minimizeWindow(e), false)

    this.shadowRoot.removeEventListener('titleUpdate', (e) => this.updateTitle(e))
  }
}

window.customElements.define('window-container', WindowContainer)
