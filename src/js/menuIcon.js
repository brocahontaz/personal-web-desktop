const template = document.createElement('template')
template.innerHTML = `
<style>
div#icon {
    float: left;
    width: 40px;
    height: 40px;
}
img {
    width: 30px;
    height: 30px;
}
slot {
    width: 30px;
    height: 30px;
}
</style>
<div id="icon">
<slot></slot>
</div>
`

export default class MenuIcon extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('menu-icon', MenuIcon)
