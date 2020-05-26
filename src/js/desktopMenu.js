const template = document.createElement('template')
template.innerHTML = `
<style>
div#menu {
    position: fixed;
    bottom: 0px;
    height: 50px;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
}
</style>
<div id="menu">
<slot></slot>
</div>
`

export default class DesktopMenu extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('desktop-menu', DesktopMenu)
