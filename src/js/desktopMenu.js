const template = document.createElement('template')
template.innerHTML = `
<style>

</style>
<div id="menu">
asdasd
<h1></h1>
</div>
`

export default class DesktopMenu extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.shadowRoot.querySelector('h1').innerText = this.getAttribute('name')
  }
}
