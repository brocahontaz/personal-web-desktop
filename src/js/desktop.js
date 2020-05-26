'use strict'

export default class Desktop extends window.HTMLElement {
  constructor () {
    super()
    this.innerHTML = 'hej'
  }
}

window.customElements.define('desktop', Desktop)
