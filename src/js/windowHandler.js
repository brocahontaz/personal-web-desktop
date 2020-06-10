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

let windowID = 0
let zIndex = 1
let active = false

export default class WindowHandler extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    /* console.log(windowID) */
    /* this.shadowRoot.addEventListener('click', () => this.dragStart(), false) */
  }

  connectedCallback () {
    console.log('connected window')
    this.shadowRoot.addEventListener('mousedown', (e) => this.dragStart(e), false)
    this.shadowRoot.addEventListener('mousemove', (e) => this.drag(e), false)
    this.shadowRoot.addEventListener('mouseup', (e) => this.dragStop(e), false)
  }

  disconnectedCallback () {
    this.shadowRoot.removeEventListener()
  }

  set setId (id) {
    windowID = id
    /* .log('TESTID' + this.shadowRoot.querySelector('div.window').id) */
    this.shadowRoot.querySelector('div.window').id = windowID
    /* console.log(windowID) */
  }

  set zIndex (index) {
    zIndex = index
    this.shadowRoot.querySelector('div.window').zIndex = zIndex
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

  dragStart (e) {
    active = true
    /* console.log(e) */
    e = e || window.event
    console.log('VÄRSTA DRAGET UNTZ UNTZ')
    const initialX = e.clientX
    const initalY = e.clientY
    console.log(initialX + '-' + initalY)
  }

  drag (e) {
    if (active) {
      console.log(e.clientX + '-' + e.clientY)
    }
  }

  dragStop (e) {
    active = false
  }
}

window.customElements.define('window-handler', WindowHandler)
