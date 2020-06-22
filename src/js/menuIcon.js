const template = document.createElement('template')
template.innerHTML = `
<style>
div {
    width: 50px;
    height: 50px;
    /*border-radius: 4px;*/
    /*background-color: white;*/
    margin-right: 5px;
    cursor: pointer;
}

div:hover {
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
</style>
<div>
  <div class="contextMenu"></div>
<img>
</div>
`

export default class MenuIcon extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.shadowRoot.querySelector('img').setAttribute('src', this.getAttribute('src'))
    this._appname = this.getAttribute('appname')
    this._fullname = this.getAttribute('fullname')
    this._icon = this.getAttribute('src')
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
  }

  get appname () {
    return this._appname
  }

  get fullname () {
    return this._fullname
  }

  get icon () {
    return this._icon
  }

  connectedCallback () {
    console.log('connected icon')
    this.shadowRoot.addEventListener('click', (e) => this.onClick(e))
    this.shadowRoot.addEventListener('contextmenu', (e) => this.displayContextMenu(e))
    document.addEventListener('click', (e) => this.hideContext(e))
    document.addEventListener('contextmenu', (e) => this.hideContext(e))
  }

  disconnectedCallback () {
    this.shadowRoot.removeEventListener('click', (e) => this.onClick(e))
    this.shadowRoot.removeEventListener('contextmenu', (e) => this.displayContextMenu(e))
    document.removeEventListener('click', (e) => this.hideContext(e))
    document.removeEventListener('contextmenu', (e) => this.hideContext(e))
  }

  onClick (e) {
    if (e.button === 0) {
      this.openWindow(e)
    } else if (e.button === 2) {
      this.displayContextMenu(e)
    }
  }

  openWindow (e) {
    console.log('HEJ')
    // document.querySelector('desktop-canvas').addWindow(this.icon, this.fullname, this.appname)
    this.dispatchEvent(this._clickEvent)
  }

  displayContextMenu (e) {
    e.preventDefault()
    console.log('context')
    this.dispatchEvent(this._contextMenuEvent)
  }

  showContext () {
    if (this._contextMenu) {
      this.hideContext()
    } else {
      this.shadowRoot.querySelector('.contextMenu').style.display = 'block'
      this._contextMenu = true
    }
  }

  hideContext (e) {
    if (e.target !== this) {
      this.shadowRoot.querySelector('.contextMenu').style.display = 'none'
      this._contextMenu = false
    }
  }
}

window.customElements.define('menu-icon', MenuIcon)
