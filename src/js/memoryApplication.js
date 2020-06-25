import './memoryBrick.js'

const template = document.createElement('template')
template.innerHTML = `
<style>
div.memoryContainer {
    width: 100%;
    height: 100%;
    background: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
}

div.memoryContainer .memoryGrid {
    width: 90%;
    height: 90%;
    max-width: 800px;
    max-height: 800px;
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    grid-template-rows: 25% 25% 25% 25%;
    justify-items: center;
    align-items: center;
}

div.memoryContainer .memoryGrid img {
  width: 90%;
  height: 90%;
}
</style>
<div class="memoryContainer">
    <div class="memoryGrid">
    </div>
<div>
`

export default class MemoryApplication extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this._imageArray = []
    this._revealed = new Map()
  }

  connectedCallback () {
    this.populateArray(9)
    this.shuffleImages()
    this.displayMemoryGridNew()
    console.log(this._imageArray)

    this.shadowRoot.addEventListener('clickBrick', (e) => this.clickBrick(e))
  }

  disconnectedCallback () {
    this.shadowRoot.removeEventListener('clickBrick', (e) => this.clickBrick(e))
  }

  populateArray (images) {
    this._imageArray = [...Array(images).keys(), ...Array(images).keys()].map(nbr => `${nbr}.png`)
  }

  shuffleImages () {
    for (let i = this._imageArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i)
      const temp = this._imageArray[i]
      this._imageArray[i] = this._imageArray[j]
      this._imageArray[j] = temp
    }
  }

  displayMemoryGrid () {
    this._imageArray.forEach(element => {
      if (element !== '0.png') {
        const img = document.createElement('img')
        img.setAttribute('src', '/image/' + element)
        console.log(img)
        this.shadowRoot.querySelector('.memoryGrid').appendChild(img)
      }
    })
  }

  displayMemoryGridNew () {
    let itr = 0
    this._imageArray.forEach(element => {
      if (element !== '0.png') {
        const brick = document.createElement('memory-brick')
        brick.setAttribute('img', element)
        brick.id = itr++
        console.log(brick)
        this.shadowRoot.querySelector('.memoryGrid').appendChild(brick)
      }
    })
  }

  clickBrick (e) {
    e.stopPropagation()
    e.cancelBubble = true
    if (this._revealed.size < 2) {
      if (!this._revealed.delete(e.detail.id)) {
        this._revealed.set(e.detail.id, e.detail.img)
      }
      console.log('map', this._revealed)
    } else {
      this.checkMatch()
      this._revealed.clear()
    }
  }

  checkMatch () {
    const arr = this._revealed.values()
    console.log(arr)
    if (arr[0]) {

    }
  }
}

window.customElements.define('memory-application', MemoryApplication)
