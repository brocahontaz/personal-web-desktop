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
 *
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
   *
   *
   * @memberof MemoryBrick
   */
  connectedCallback () {
    this.tabIndex = 1
    // this.setAttribute('tabindex', 1)
    this._img = this.getAttribute('img')
    this.shadowRoot.querySelector('.backside').setAttribute('src', '/image/' + this._backside)
    this.shadowRoot.querySelector('.frontside').setAttribute('src', '/image/' + this._img)

    this.shadowRoot.addEventListener('click', (e) => this.clickBrick(e))
    this.addEventListener('keypress', (e) => this.clickBrick(e))
    this.addEventListener('focus', (e) => this.focusBrick(e))
    this.addEventListener('blur', (e) => this.unFocusBrick(e))
  }

  /**
   *
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
   *
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

  static get observedAttributes () { return ['img'] }

  /**
   *
   *
   * @memberof MemoryBrick
   */
  updateBrick () {
    this._img = this.getAttribute('img')
  }

  /**
   *
   *
   * @param {*} e
   * @memberof MemoryBrick
   */
  focusBrick (e) {
    this.shadowRoot.querySelector('.pointer').style.display = 'block'
  }

  /**
   *
   *
   * @param {*} e
   * @memberof MemoryBrick
   */
  unFocusBrick (e) {
    this.shadowRoot.querySelector('.pointer').style.display = 'none'
  }

  /**
   *
   *
   * @readonly
   * @memberof MemoryBrick
   */
  get img () {
    return this._img
  }

  /**
   *
   *
   * @memberof MemoryBrick
   */
  get focused () {
    return this._focused
  }

  /**
   *
   *
   * @memberof MemoryBrick
   */
  set focused (focus) {
    this._focused = focus
  }

  /**
   *
   *
   * @readonly
   * @memberof MemoryBrick
   */
  get matched () {
    return this._matched
  }

  /**
   *
   *
   * @param {*} e
   * @memberof MemoryBrick
   */
  testSpace (e) {
    console.log(e)
  }

  /**
   *
   *
   * @param {*} e
   * @memberof MemoryBrick
   */
  clickBrick (e) {
    // this.blur()
    // e.preventDefault()
    // e.stopPropagation()
    if (e.keyCode === 32 || e.button === 0) {
      this._clickBrick = new window.CustomEvent('clickBrick', {
        bubbles: true,
        cancelable: true,
        detail: { id: this.id, img: this._img, revealed: this._revealed, matched: this._matched }
      })
      this.dispatchEvent(this._clickBrick)
    } else {

    }
  }

  /**
   *
   *
   * @param {*} e
   * @memberof MemoryBrick
   */
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

  /**
   *
   *
   * @memberof MemoryBrick
   */
  match () {
    // this.tabIndex = -1
    // this.removeAttribute('tabindex')
    this._matched = true
    this.shadowRoot.querySelector('.backside').style.display = 'none'
    this.shadowRoot.querySelector('.frontside').style.display = 'none'
  }
}

window.customElements.define('memory-brick', MemoryBrick)
