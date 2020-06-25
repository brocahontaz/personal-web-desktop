const template = document.createElement('template')
template.innerHTML = `
<style>
div.memoryContainer {
    width: 100%;
    height: 100%;
    background: #fffffF;
}

div.memoryContainer .memoryGrid {
    width:90%;
    height: 90%;
    padding: 5%;
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    grid-template-rows: 25% 25% 25% 25%;
    justify-items: center;
    align-items: center
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
  }

  connectedCallback () {
    this.populateArray(9)
    this.shuffleImages()
    this.displayMemoryGrid()
    console.log(this._imageArray)
  }

  disconnectedCallback () {

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
}

window.customElements.define('memory-application', MemoryApplication)
