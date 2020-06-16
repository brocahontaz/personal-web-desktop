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
</style>
<div>
<img>
</div>
`

export default class MenuIcon extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.shadowRoot.querySelector('img').setAttribute('src', this.getAttribute('src'))
    this._name = this.getAttribute('name')
    this._icon = this.getAttribute('src')
  }

  get name () {
    return this._name
  }

  get icon () {
    return this._icon
  }

  connectedCallback () {
    console.log('connected icon')
    this.shadowRoot.addEventListener('click', () => this.openWindow())
  }

  disconnectedCallback () {
    this.shadowRoot.removeEventListener()
  }

  openWindow () {
    console.log('HEJ')
    document.querySelector('desktop-canvas').addWindow(this.icon, this.name)
  }
}

window.customElements.define('menu-icon', MenuIcon)
