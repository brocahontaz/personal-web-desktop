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
  }

  connectedCallback () {
    this.addEventListener('click', () => this.openWindow())
  }

  disconnectedCallback () {
    this.removeEventListener()
  }

  openWindow () {
    console.log('HEJ')
    document.querySelector('desktop-canvas').addWindow('tet')
  }
}

window.customElements.define('menu-icon', MenuIcon)
