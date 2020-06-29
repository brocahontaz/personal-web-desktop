const template = document.createElement('template')
template.innerHTML = `
<style>
div.brickContainer {
  width: auto;
  height: auto;
  max-width: 90%;
  max-height: 90%;
  padding: 0;
  margin: 0;
  user-select: none;
  object-fit: contain;
  /*background: red;
  /*display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 100%;
  /*justify-content: center;*/
}
img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  padding: 0;
  margin: 0;
  object-fit: contain;
  /*transition: visibility 0.5s;
  grid-column: 1 / 1 / 1 / 1;
  grid-row: 1 / 1 / 1 / 1;*/
}
img.backside {
  display: block;
  /*visibility: visible;*/
}
img.frontside {
  display: none;
  /*visibility: hidden;*/
}
</style>
<div class="brickContainer">
  <img src="/image/" class="backside">
  <img src ="/image" class="frontside">
</div>
`

export default class MemoryBrick extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this._backside = '0.png'
    this._img = this.getAttribute('img')
    this._reveal = false
    this._matched = false
    this._clickBrick = new window.CustomEvent('clickBrick', {
      bubbles: true,
      cancelable: true,
      detail: { id: this.id, img: this._img, revealed: this._revealed }
    })
  }

  connectedCallback () {
    this._img = this.getAttribute('img')
    this.shadowRoot.querySelector('.backside').setAttribute('src', '/image/' + this._backside)
    this.shadowRoot.querySelector('.frontside').setAttribute('src', '/image/' + this._img)

    this.shadowRoot.addEventListener('click', (e) => this.clickBrick(e))
  }

  disconnectedCallback () {
    this.shadowRoot.removeEventListener('click', (e) => this.clickBrick(e))
  }

  attributeChangedCallback (name, oldValue, newValue) {
    this.updateBrick()
  }

  static get observedAttributes () { return ['img'] }

  updateBrick () {
    this._img = this.getAttribute('img')
  }

  get img () {
    return this._img
  }

  clickBrick (e) {
    this._clickBrick = new window.CustomEvent('clickBrick', {
      bubbles: true,
      cancelable: true,
      detail: { id: this.id, img: this._img, revealed: this._revealed }
    })
    this.dispatchEvent(this._clickBrick)
  }

  toggleView (e) {
    if (this._reveal && !this._matched) {
      this._reveal = false
      this.shadowRoot.querySelector('.backside').style.display = 'block'
      this.shadowRoot.querySelector('.frontside').style.display = 'none'
      /* this.shadowRoot.querySelector('.backside').style.visibility = 'visible'
      this.shadowRoot.querySelector('.frontside').style.visibility = 'hidden' */
    } else if (!this._matched) {
      this._reveal = true
      this.shadowRoot.querySelector('.backside').style.display = 'none'
      this.shadowRoot.querySelector('.frontside').style.display = 'block'
      /* this.shadowRoot.querySelector('.backside').style.visibility = 'hidden'
      this.shadowRoot.querySelector('.frontside').style.visibility = 'visible' */
    }
    /*
    this._clickBrick = new window.CustomEvent('clickBrick', {
      bubbles: true,
      cancelable: true,
      detail: { id: this.id, img: this._img, revealed: this._revealed }
    })

    this.dispatchEvent(this._clickBrick) */
  }

  match () {
    this._matched = true
    this.shadowRoot.querySelector('.backside').style.display = 'none'
    this.shadowRoot.querySelector('.frontside').style.display = 'none'
  }
}

window.customElements.define('memory-brick', MemoryBrick)
