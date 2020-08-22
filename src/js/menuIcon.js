const template = document.createElement('template')
template.innerHTML = `
<head>
<link rel="stylesheet" href="../css/font-awesome-4.7.0/css/font-awesome.css">
<style>
div {
    transition: height 5s ease-out;
}
/*
div:hover {
    background: rgba(255,255,255,0.5);
}*/

div.iconContainer {
    width: 50px;
    height: 50px;
    margin-right: 5px;
    cursor: pointer;
}

div.iconContainer:hover {
    background: rgba(255,255,255,0.5);

}

img {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    display: block;
    margin: 0 auto;
}

div.contextWrapper {
  position: absolute;
  top: -450px;
  height: 450px;
  background: none;
  display: none;
}

div.contextMenu {
  font-family: 'Roboto', sans-serif;
  position: absolute;
  bottom: 0;
  width: 250px;
  height: auto;
  overflow: auto;
  max-height: 450px;
  background: rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid #000000;
  display: none;
  cursor: auto;
  flex-direction: column;
  font-size: 0.9rem;
  padding: 0;
  color: #ffffff;
}

div.contextMenu span {
  /*padding: 15px;*/
}

div.contextMenu span:hover {
  /*background: rgba(255, 255, 255, 0.2);*/
}

div.contextMenu span .first {
  padding-top: 15px;
}

div.contextMenu hr {
  background: rgba(255, 255, 255, 0.2);
  height: 1px;
  border: 0;
  width: 50%;
}

div.contextMenu #showAll {
  padding: 15px;
  display: flex;
  justify-content: space-between;
}

div.contextMenu #showAll:hover {
  background: rgba(255, 255, 255, 0.2);
}

div.contextMenu #showAll .expandIcon {
  display: block;
}

div.contextMenu #showAll .shrinkIcon {
  display: none;
}

div.contextMenu .collapsibleList {
  padding: 0;
  margin: 0;
  display: none;
  height: 0;
  transition: max-height 0.5s ease-out;
}

ul.contextOptions {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

ul.contextList {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

ul.contextOptions li {
    font-size: 0.9rem;
    margin: 0;
    padding: 15px
}

ul.contextOptions li:hover {
  background: rgba(255, 255, 255, 0.2);
}

ul.contextList li {
    font-size: 0.9rem;
    margin: 0;
    padding: 15px;
}

ul.contextList li:hover{
  background: rgba(255, 255, 255, 0.2);
}

button.expand {
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

button.expand:focus {
  background-color: rgba(255,255,255, 0);
  box-shadow: 0px 0px 0px transparent;
  border: 0px solid transparent;
  outline: 0;
  text-shadow: 0px 0px 0px transparent;
  padding: 0;
  color: #ffffff;
  text-align: center;
}

button.expand:hover {
  background-color: rgba(0,0,0, 0.5);
}

button.expand:active {
  background-color: rgba(255,255,255, 0.5);
}

.moveup {
  animation: moveup 0.5s;
}

.movedown {
  animation: movedown 0.5s;
}

@keyframes moveup {
  from { height: 0 }
  to: { height: auto }
}

@keyframes movedown {
  from { height: auto }
  to { height:  0 }
}
</style>
</head>
<div>
  <div class="contextWrapper">
    <div class="contextMenu">
      <div id="showAll">
        <span>All windows</span>
        <span class="expandIcon"><i class="fa fa-expand"></i></span>
        <span class="shrinkIcon"><i class="fa fa-compress"></i></span>
      </div>
      <div class="collapsibleList">
        <ul class="contextList">        
        </ul>
      </div>
      <hr>
      <ul class="contextOptions">
        <li id="newWindow">New window</li>
        <li id="minimizeAll">Minimize all windows</li>
        <li id="closeAll">Close all windows</li>
      </ul>
    </div>
  </div>
  <div class="iconContainer">
    <img>
  </div>
</div>
`

/**
 * Webcomponent module for the menu icons
 *
 * @export
 * @class MenuIcon
 * @extends {window.HTMLElement}
 */
export default class MenuIcon extends window.HTMLElement {
  /**
   *Creates an instance of MenuIcon.
   * @memberof MenuIcon
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.shadowRoot.querySelector('img').setAttribute('src', this.getAttribute('src'))
    this._appname = this.getAttribute('appname')
    this._fullname = this.getAttribute('fullname')
    this._icon = this.getAttribute('src')
    this._instanceList = new window.Set()
    this._contextMenu = false
    this._clickEvent = new window.CustomEvent('menuIconClick', {
      bubbles: true,
      cancelable: true,
      detail: { icon: this._icon, fullname: this._fullname, appname: this._appname }
    })
    this._contextMenuEvent = new window.CustomEvent('displayContextMenu', {
      bubbles: true,
      cancelable: true,
      detail: { appname: this._appname, fullname: this._fullname }
    })
    this._minimizeAllEvent = new window.CustomEvent('minimizeAll', {
      bubbles: true,
      cancelable: true,
      detail: { appname: this._appname, fullname: this._fullname }
    })
    this._closeAllEvent = new window.CustomEvent('closeAll', {
      bubbles: true,
      cancelable: true,
      detail: { appname: this._appname, fullname: this._fullname }
    })
  }

  /**
   * Get the app name
   *
   * @readonly
   * @memberof MenuIcon
   */
  get appname () {
    return this._appname
  }

  /**
   * Get the app full name
   *
   * @readonly
   * @memberof MenuIcon
   */
  get fullname () {
    return this._fullname
  }

  /**
   * Get the icon
   *
   * @readonly
   * @memberof MenuIcon
   */
  get icon () {
    return this._icon
  }

  /**
   * Connected callback, called when element is created
   * Adding event listeners etc
   *
   * @memberof MenuIcon
   */
  connectedCallback () {
    this.shadowRoot.querySelector('.iconContainer').addEventListener('click', (e) => this.onClick(e))
    this.shadowRoot.querySelector('.iconContainer').addEventListener('contextmenu', (e) => this.displayContextMenu(e))
    this.shadowRoot.getElementById('showAll').addEventListener('click', (e) => this.showAll(e))
    this.shadowRoot.getElementById('newWindow').addEventListener('click', (e) => this.openWindow(e))
    this.shadowRoot.getElementById('minimizeAll').addEventListener('click', (e) => this.minimizeAll(e))
    this.shadowRoot.getElementById('closeAll').addEventListener('click', (e) => this.closeAll(e))
    this.shadowRoot.querySelector('.contextList').addEventListener('click', (e) => this.restoreWindow(e))
    document.addEventListener('click', (e) => this.hideContext(e))
    document.addEventListener('contextmenu', (e) => this.hideContext(e))
  }

  /**
   * Disconnected callback, called when element is destroyed
   * Removing event listeners etc
   *
   * @memberof MenuIcon
   */
  disconnectedCallback () {
    this.shadowRoot.querySelector('.iconContainer').removeEventListener('click', (e) => this.onClick(e))
    this.shadowRoot.querySelector('.iconContainer').removeEventListener('contextmenu', (e) => this.displayContextMenu(e))
    this.shadowRoot.getElementById('showAll').removeEventListener('click', (e) => this.showAll(e))
    this.shadowRoot.getElementById('newWindow').removeEventListener('click', (e) => this.openWindow(e))
    this.shadowRoot.getElementById('minimizeAll').removeEventListener('click', (e) => this.minimizeAll(e))
    this.shadowRoot.getElementById('closeAll').removeEventListener('click', (e) => this.closeAll(e))
    this.shadowRoot.querySelector('.contextList').removeEventListener('click', (e) => this.restoreWindow(e))
    document.removeEventListener('click', (e) => this.hideContext(e))
    document.removeEventListener('contextmenu', (e) => this.hideContext(e))
  }

  /**
   * Click event, open new window if left click, open context menu if right click
   *
   * @param {Event} e the event
   * @memberof MenuIcon
   */
  onClick (e) {
    if (e.button === 0) {
      this.openWindow(e)
    } else if (e.button === 2) {
      this.displayContextMenu(e)
    }
  }

  /**
   * Open new window of the application
   *
   * @param {Event} e the event
   * @memberof MenuIcon
   */
  openWindow (e) {
    this.hideContext(e)
    this.dispatchEvent(this._clickEvent)
  }

  /**
   * Dispatch event for displaying context menu
   *
   * @param {Event} e the event
   * @memberof MenuIcon
   */
  displayContextMenu (e) {
    e.preventDefault()
    this.dispatchEvent(this._contextMenuEvent)
  }

  /**
   * Show the context menu
   *
   * @param {Event} e the event
   * @param {Set} list the list of open windows
   * @memberof MenuIcon
   */
  showContext (e, list) {
    this.shadowRoot.querySelector('.collapsibleList').style.height = null
    this.shadowRoot.querySelector('.collapsibleList').style.display = 'none'
    this.shadowRoot.querySelector('.shrinkIcon').style.display = 'none'
    this.shadowRoot.querySelector('.expandIcon').style.display = 'block'

    if (this._contextMenu) {
      this._instanceList = list
      this.updateList()
      this.shadowRoot.querySelector('.contextMenu').style.display = 'none'
      this.shadowRoot.querySelector('.contextWrapper').style.display = 'none'
      this._contextMenu = false
    } else {
      this._instanceList = list
      this.updateList()
      this.shadowRoot.querySelector('.contextMenu').style.display = 'flex'
      this.shadowRoot.querySelector('.contextWrapper').style.display = 'flex'
      this._contextMenu = true
    }
  }

  /**
   * Update the context menu window list
   *
   * @memberof MenuIcon
   */
  updateList () {
    this.shadowRoot.querySelector('.contextList').innerHTML = ''
    this._instanceList.forEach(element => {
      const listElem = document.createElement('li')
      listElem.id = element
      listElem.innerText = element + '. ' + this._fullname
      this.shadowRoot.querySelector('.contextList').appendChild(listElem)
    })
  }

  /**
   * Add window to the context menu list
   *
   * @param {*} element
   * @memberof MenuIcon
   */
  displayWindowInContext (element) {
    const listElem = document.createElement('li')
    listElem.innerText = element + '. ' + this._fullname
    this.shadowRoot.querySelector('.contextList').appendChild(listElem)
  }

  /**
   * Hide the context menu
   *
   * @param {Event} e the event
   * @memberof MenuIcon
   */
  hideContext (e) {
    if (e.target !== this) {
      this.shadowRoot.querySelector('.contextMenu').style.display = 'none'
      this.shadowRoot.querySelector('.contextWrapper').style.display = 'none'
      this._contextMenu = false
    }
  }

  /**
   * Show all open windows of an application in its context menu
   *
   * @param {Event} e the event
   * @memberof MenuIcon
   */
  showAll (e) {
    const list = this.shadowRoot.querySelector('.collapsibleList')

    if (this.shadowRoot.querySelector('.contextList').hasChildNodes()) {
      if (list.style.height) {
        list.style.height = null
        this.shadowRoot.querySelector('.collapsibleList').style.display = 'none'
        this.shadowRoot.querySelector('.shrinkIcon').style.display = 'none'
        this.shadowRoot.querySelector('.expandIcon').style.display = 'block'
      } else {
        list.style.height = 'auto'
        this.shadowRoot.querySelector('.collapsibleList').style.display = 'block'
        this.shadowRoot.querySelector('.shrinkIcon').style.display = 'block'
        this.shadowRoot.querySelector('.expandIcon').style.display = 'none'
      }
    }
  }

  /**
   * Dispatch event for minimizing all windows of an appliation
   *
   * @param {e} e the event
   * @memberof MenuIcon
   */
  minimizeAll (e) {
    this.dispatchEvent(this._minimizeAllEvent)
  }

  /**
   * Dispatch event for restoring a minimized window
   *
   * @param {Event} e the event
   * @memberof MenuIcon
   */
  restoreWindow (e) {
    const windowID = e.target.id
    const restoreEvent = new window.CustomEvent('restoreWindow', {
      bubbles: true,
      cancelable: true,
      detail: { id: windowID }
    })
    this.dispatchEvent(restoreEvent)
  }

  /**
   * Dispatch event for closing all windows of an application
   *
   * @param {Event} e the event
   * @memberof MenuIcon
   */
  closeAll (e) {
    this.shadowRoot.querySelector('.shrinkIcon').style.display = 'none'
    this.shadowRoot.querySelector('.expandIcon').style.display = 'block'
    this.shadowRoot.querySelector('.contextList').innerHTML = ''
    this.dispatchEvent(this._closeAllEvent)
  }
}

window.customElements.define('menu-icon', MenuIcon)
