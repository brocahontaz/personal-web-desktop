const template = document.createElement('template')
template.innerHTML = `
<style>
div {
  width: 90%;
  height: 90%;
  padding: 0;
  margin: 0;
  background: red;
  display: flex;
  justify-content: center;
}
img {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
img.backside {
  display: block;
}
img.frontside {
  display: none;
}
</style>
<div>
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

    this.addEventListener('click', (e) => this.toggleView(e))
  }

  disconnectedCallback () {
    this.removeEventListener('click', (e) => this.toggleView(e))
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

  toggleView (e) {
    if (this._reveal && !this._matched) {
      this._reveal = false
      this.shadowRoot.querySelector('.backside').style.display = 'block'
      this.shadowRoot.querySelector('.frontside').style.display = 'none'
    } else if (!this._matched) {
      this._reveal = true
      this.shadowRoot.querySelector('.backside').style.display = 'none'
      this.shadowRoot.querySelector('.frontside').style.display = 'block'
    }

    this._clickBrick = new window.CustomEvent('clickBrick', {
      bubbles: true,
      cancelable: true,
      detail: { id: this.id, img: this._img, revealed: this._revealed }
    })

    this.dispatchEvent(this._clickBrick)
  }

  match () {
    this._matched = true
    this.shadowRoot.querySelector('.backside').style.display = 'none'
    this.shadowRoot.querySelector('.frontside').style.display = 'none'
  }
}

window.customElements.define('memory-brick', MemoryBrick)
