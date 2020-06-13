const template = document.createElement('template')
template.innerHTML = `
<head>
<style>
div.window {
    width: 500px;
    height: 500px;
    background: rgba(178, 178, 178, 0.5);
    border-radius: 10px 10px 0px 0px;
    position: absolute;
    top: 10px;
    left: 10px;
}
div.topbar {
    width: 100%;
    height: 30px;
    background: rgba(178, 178, 178, 0.5);
    border-radius: 10px 10px 0px 0px;
    position: absolute;
    top: 0;
    left: 0;
}
div.content {

}
</style>
</head>
<div class="window" id='0'>
    <div class="topbar">hej
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

export default class WindowHandler extends window.HTMLElement {
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
    document.addEventListener('mousemove', (e) => this.drag(e), false)
    this.shadowRoot.getElementById(this._windowID).querySelector('div.topbar').addEventListener('mouseup', (e) => this.dragStop(e), false)
  }

  disconnectedCallback () {
    this.shadowRoot.removeEventListener()
  }

  set setId (id) {
    this._windowID = id
    /* .log('TESTID' + this.shadowRoot.querySelector('div.window').id) */
    this.shadowRoot.querySelector('div.window').id = this._windowID
    /* console.log(windowID) */
  }

  set zIndex (index) {
    this._zIndex = index
    this.shadowRoot.querySelector('div.window').zIndex = this._zIndex
  }

  get zIndex () {
    return this._zIndex
  }

  jump (step) {
    const desktopWindow = this.shadowRoot.querySelector('div.window')
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
    console.log(this.shadowRoot.querySelector('div.window').id)
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
    this.shadowRoot.querySelector('div.window').style.background = 'rgba(178, 178, 178, 0.9)'
    this.zIndex = 999
    console.log(this.zIndex)
  }

  unFocusWindow () {
    this.shadowRoot.querySelector('div.window').style.background = 'rgba(178, 178, 178, 0.5)'
    this.zIndex = 1
    console.log(this.zIndex)
  }

  dragStart (e) {
    this.shadowRoot.querySelector('div.topbar').style.cursor = 'pointer'
    this._active = true
    /* console.log(e) */
    e = e || window.event
    e.preventDefault()
    console.log('VÄRSTA DRAGET UNTZ UNTZ')
    this._initialX = e.clientX - this._xOffset
    this._initialY = e.clientY - this._yOffset
    console.log(this._initialX + '-' + this._initialY)
  }

  drag (e) {
    if (this._active) {
      e = e || window.event
      e.preventDefault()
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

window.customElements.define('window-handler', WindowHandler)
