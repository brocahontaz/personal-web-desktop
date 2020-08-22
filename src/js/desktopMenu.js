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
    display: flex;
    user-select: none;
    z-index: 1000;
}
</style>
<div id="menu">
<slot></slot>
</div>
`

/**
 *
 *
 * @export
 * @class DesktopMenu
 * @extends {window.HTMLElement}
 */
export default class DesktopMenu extends window.HTMLElement {
  /**
   *Creates an instance of DesktopMenu.
   * @memberof DesktopMenu
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('desktop-menu', DesktopMenu)
