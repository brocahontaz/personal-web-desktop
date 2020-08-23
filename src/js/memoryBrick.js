const template = document.createElement('template')
template.innerHTML = `
<head>
<link rel="stylesheet" href="../css/font-awesome-4.7.0/css/font-awesome.css">
<style>
:host {
  all: initial;
  display: block;
  content: contain;
  height: 100%;
  width: 100%;
}
div {
  /*max-width: 100%;
  max-height: 100%;*/
}
div.brickContainer {
  position: relative;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  user-select: none;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  justify-items: center;
  /*background: green;
  /*background: red;
  /*display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 100%;
  /*justify-content: center;*/
}

.focus {
  /*border: 1px solid #ababab;
  background: rgba(0,0,0,0.3)*/
}
img {
  height: 100%;
  width: 100%;
  object-fit: contain;
  padding: 0;
  margin: 0;
  /*transition: visibility 0.5s;
  grid-column: 1 / 1 / 1 / 1;
  grid-row: 1 / 1 / 1 / 1;*/
}
img.backside {
  display: block; /* block */
  /*visibility: visible;*/
}
img.frontside {
  display: none;
  /*visibility: hidden;*/
}

.pointer {
  display: none;
  position: absolute;
  top: 5%;
  font-size: 2.0rem;
  color: #FF8F4F;
  opacity: 0.9;
}
</style>
</head>
<div class="brickContainer" id="space">
  <div class="pointer"><i class="fa fa-map-marker" aria-hidden="true"></i></div>
  <img src="/image/" class="backside">
  <img src ="/image" class="frontside">
</div>
`

/**
 * Webcomponent module for the memory brick element
 *
 * @export
 * @class MemoryBrick
 * @extends {window.HTMLElement}
 */
export default class MemoryBrick extends window.HTMLElement {
  /**
   *Creates an instance of MemoryBrick.
   * @memberof MemoryBrick
   */
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
    this._focused = false
  }

  /**
   * Connected callback, called when element is created
   * Make focusable, add event listeners
   *
   * @memberof MemoryBrick
   */
  connectedCallback () {
    this.tabIndex = 1
    this._img = this.getAttribute('img')
    this.shadowRoot.querySelector('.backside').setAttribute('src', '/image/' + this._backside)
    this.shadowRoot.querySelector('.frontside').setAttribute('src', '/image/' + this._img)

    this.shadowRoot.addEventListener('click', (e) => this.clickBrick(e))
    this.addEventListener('keypress', (e) => this.clickBrick(e))
    this.addEventListener('focus', (e) => this.focusBrick(e))
    this.addEventListener('blur', (e) => this.unFocusBrick(e))
  }

  /**
   * Disconnected callback, called when element is destroyed
   * Removing event listeners
   *
   * @memberof MemoryBrick
   */
  disconnectedCallback () {
    this.shadowRoot.removeEventListener('click', (e) => this.clickBrick(e))
    this.shadowRoot.removeEventListener('keypress', (e) => this.clickBrick(e))
    this.removeEventListener('focus', (e) => this.focusBrick(e))
    this.removeEventListener('blur', (e) => this.unFocusBrick(e))
  }

  /**
   * Attribute changed callback, called when attribute changed
   *
   * @param {*} name
   * @param {*} oldValue
   * @param {*} newValue
   * @memberof MemoryBrick
   */
  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'img') {
      this.updateBrick()
    }
  }

  // Observed attribute
  static get observedAttributes () { return ['img'] }

  /**
   * Update the brick
   *
   * @memberof MemoryBrick
   */
  updateBrick () {
    this._img = this.getAttribute('img')
  }

  /**
   * Focus the brick
   *
   * @param {Event} e the event
   * @memberof MemoryBrick
   */
  focusBrick (e) {
    this.shadowRoot.querySelector('.pointer').style.display = 'block'
  }

  /**
   * Unfocus the brick
   *
   * @param {Event} e the event
   * @memberof MemoryBrick
   */
  unFocusBrick (e) {
    this.shadowRoot.querySelector('.pointer').style.display = 'none'
  }

  /**
   * Get brick image
   *
   * @readonly
   * @memberof MemoryBrick
   */
  get img () {
    return this._img
  }

  /**
   * Get brick focus
   *
   * @memberof MemoryBrick
   */
  get focused () {
    return this._focused
  }

  /**
   * Set brick focus
   *
   * @memberof MemoryBrick
   */
  set focused (focus) {
    this._focused = focus
  }

  /**
   * Check if brick has been matched
   *
   * @readonly
   * @memberof MemoryBrick
   */
  get matched () {
    return this._matched
  }

  /**
   * Click brick event
   * Dispatches click brick event
   *
   * @param {Event} e the event
   * @memberof MemoryBrick
   */
  clickBrick (e) {
    if (e.keyCode === 32 || e.button === 0) {
      this._clickBrick = new window.CustomEvent('clickBrick', {
        bubbles: true,
        cancelable: true,
        detail: { id: this.id, img: this._img, revealed: this._revealed, matched: this._matched }
      })
      this.dispatchEvent(this._clickBrick)
    }
  }

  /**
   * Toggle if brick is visible
   *
   * @param {Event} e the event
   * @memberof MemoryBrick
   */
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
  }

  /**
   * Set matched to true
   *
   * @memberof MemoryBrick
   */
  match () {
    this._matched = true
    this.shadowRoot.querySelector('.backside').style.display = 'none'
    this.shadowRoot.querySelector('.frontside').style.display = 'none'
  }
}

window.customElements.define('memory-brick', MemoryBrick)
