const template = document.createElement('template')
template.innerHTML = `
<head>
<link rel="stylesheet" href="/css/font-awesome-4.7.0/css/font-awesome.css">
<style>
div.windowContainer {
    width: 500px;
    height: 500px;
    /*background: rgba(128, 128, 128, 0.5);*/
    border-radius: 7px 7px 2px 2px;
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1;
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
        <span class="applicationName">Application</span>
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
    this._windowID = 0
    this._zIndex = 1
    this._active = false
    this._initialY = 0
    this._initialX = 0
    this._currentY = 0
    this._currentX = 0
    this._yOffset = 0
    this._xOffset = 0
  }

  connectedCallback () {
    this.tabIndex = 1
    this.setAttribute('tabindex', 1)
    console.log('connected window')
    /* this.shadowRoot.getElementById(this._windowID).addEventListener('click', () => this.focusWindow(), false) */
    this.addEventListener('focus', () => this.focusWindow(), false)
    this.addEventListener('blur', () => this.unFocusWindow(), false)
    this.shadowRoot.getElementById(this._windowID).querySelector('div.topbar').addEventListener('mousedown', (e) => this.dragStart(e), false)
    this.shadowRoot.getElementById(this._windowID).querySelector('div.topbar').addEventListener('focus', (e) => this.focusWindow(), false)
    document.addEventListener('mousemove', (e) => this.drag(e), false)
    this.shadowRoot.getElementById(this._windowID).querySelector('div.topbar').addEventListener('mouseup', (e) => this.dragStop(e), false)

    this.shadowRoot.getElementById('close')
  }

  disconnectedCallback () {
    this.shadowRoot.removeEventListener()
  }

  set setId (id) {
    this._windowID = id
    /* .log('TESTID' + this.shadowRoot.querySelector('div.window').id) */
    this.shadowRoot.querySelector('div.windowContainer').id = this._windowID
    /* console.log(windowID) */
  }

  set zIndex (index) {
    this._zIndex = index
    this.shadowRoot.querySelector('div.windowContainer').style.zIndex = this._zIndex
  }

  get zIndex () {
    return this._zIndex
  }

  jump (step) {
    const desktopWindow = this.shadowRoot.querySelector('div.windowContainer')
    const desktopWindowStyles = window.getComputedStyle(desktopWindow, null)
    desktopWindow.style.top = '10px'
    desktopWindow.style.left = '10px'
    const topMargin = desktopWindow.style.top
    const leftMargin = desktopWindow.style.left
    console.log('Margin ' + topMargin)
    console.log(this)
    console.log(desktopWindow)
    console.log('ds', desktopWindowStyles.alignContent)
    console.log('TEST: ' + desktopWindowStyles.getPropertyValue('top'))
    console.log('TOPMARGIN TEST: ' + window.getComputedStyle(desktopWindow, null).getPropertyValue('width'))
    console.log(this.shadowRoot.querySelector('div.windowContainer').id)
    if (parseInt(topMargin) < 100 && parseInt(leftMargin) < 100) {
      desktopWindow.style.top = `${parseInt(topMargin) + (step * 10)}px`
      console.log(`${parseInt(topMargin) + (step * 10)}px`)
      desktopWindow.style.left = `${parseInt(leftMargin) + (step * 10)}px`
      console.log('IFIFIFIF')
    }
    console.log(desktopWindow.style.top)
  }

  focusWindow () {
    /* document.body.querySelector('window-handler').shadowRoot.querySelector('div.window').style.background = 'rgba(178, 178, 178, 0.5)' */
    this.shadowRoot.querySelector('div.windowContainer').style.background = 'rgba(128, 128, 128, 0.9)'
    this.zIndex = 999
    console.log('Z: ' + this.shadowRoot.querySelector('div.windowContainer').zIndex)
    console.log(this.zIndex)
  }

  unFocusWindow () {
    this.shadowRoot.querySelector('div.windowContainer').style.background = 'rgba(128, 128, 128, 0.5)'
    this.zIndex = 1
    console.log(this.zIndex)
  }

  dragStart (e) {
    this.shadowRoot.querySelector('div.topbar').style.cursor = 'pointer'
    this._active = true
    /* console.log(e) */
    e = e || window.event
    /* e.preventDefault() */
    console.log('VÄRSTA DRAGET UNTZ UNTZ')
    this._initialX = e.clientX - this._xOffset
    this._initialY = e.clientY - this._yOffset
    console.log(this._initialX + '-' + this._initialY)
  }

  drag (e) {
    if (this._active) {
      e = e || window.event
      /* e.preventDefault() */
      this._currentY = e.clientY - this._initialY
      this._currentX = e.clientX - this._initialX

      this._yOffset = this._currentY
      this._xOffset = this._currentX

      this.move(this._currentX, this._currentY)

      console.log(e.clientX + '-' + e.clientY)
    }
  }

  dragStop (e) {
    this.shadowRoot.querySelector('div.topbar').style.cursor = 'auto'
    console.log('DRAGET ÄR ÖVER')
    this._active = false
    this._initialY = this._currentY
    this._initialX = this._currentX
  }

  move (xPos, yPos) {
    console.log('MOVEIT MOVEIT')
    /* const desktopWindow = this.shadowRoot.querySelector('div.window') */
    const desktopWindow = this.shadowRoot.getElementById(this._windowID)
    console.log(desktopWindow.style.top)
    /* desktopWindow.style.top = yPos + 'px'
    desktopWindow.style.left = xPos + 'px' */
    desktopWindow.style.transform = 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0)'
  }
}

window.customElements.define('window-container', WindowContainer)
