import './memoryBrick.js'

const template = document.createElement('template')
template.innerHTML = `
<style>
div {
  font-family: 'Roboto', sans-serif;
  font-size: 1.0rem;
}
div.memoryContainer {
    width: 100%;
    height: 100%;
    background: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
}

div.memoryContainer .memoryMenu {
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  display: grid;
  grid-template-rows: 70% 30%;
}

div.memoryContainer .memoryMenu .highScore {
  width: 100%;
  display: flex;
  justify-content: center;
}
div.memoryContainer .memoryMenu .highScore h2 {
  font-size: 1.2rem;
  font-weight: 800;
}

div.memoryContainer .memoryMenu .actionMenu {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

div.memoryContainer .memoryMenu .actionMenu fieldset {
  border-radius: 10px;
}

div.memoryContainer .memoryMenu .actionMenu legend {
  font-weight: 800;
}

div.memoryContainer .memoryMenu .actionMenu .choices{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

div.memoryContainer .memoryGrid {
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    max-width: 800px;
    max-height: 800px;
    display: none;
    grid-template-columns: 25% 25% 25% 25%;
    grid-template-rows: 25% 25% 25% 25%;
    justify-items: center;
    align-items: center;
}

div.memoryContainer .memoryGrid img {
  width: 90%;
  height: 90%;
}

button.play {
  height: 50px;
  width: 100%;
  background-color: #4D5787;
  box-shadow: 0px 0px 0px transparent;
  border: 0px solid transparent;
  border-radius: 12px;
  text-shadow: 0px 0px 0px transparent;
  padding: 0;
  margin: 0;
  color: #ffffff;
  text-align: center;
  font-size: 1.0rem;
  font-weight: 800;
  justify-self: flex-end;
}

button.play:focus {
  background-color: #4D5787;
  box-shadow: 0px 0px 0px transparent;
  border: 0px solid transparent;
  outline: 0;
  text-shadow: 0px 0px 0px transparent;
  padding: 0;
  color: #ffffff;
  text-align: center;
}

button.play:hover {
  background-color: #39406F;
}

button.play:active {
  background-color: #B9B8C5;
}
</style>
<div class="memoryContainer">
    <div class="memoryMenu">
      <div class="highScore">
        <h2>High Score</h2>
        <ol>
        </ol>
      </div>
      <div class="actionMenu">
        
        <fieldset>
          <legend>Pick grid size</legend>
        <div class="choices">
          
          <span>
            <input type="radio" id="4by4" name="gridSize" value="4by4" checked="checked">
            <label for="4by4">4 x 4</label>
          </span>
          <span>
            <input type="radio" id="2by2" name="gridSize" value="2by2">
            <label for="2by2">2 x 2</label>
          </span>
          <span>
            <input type="radio" id="2by4" name="gridSize" value="2by4">
            <label for="2by4">2 x 4</label>
          </span>
        
        </div>
        </fieldset>
        <button class="play">Play!</button>
      </div>
    </div>
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
    // this.populateArray(9)
    // this.shuffleImages()
    // this.displayMemoryGridNew()
    console.log(this._imageArray)

    this.shadowRoot.addEventListener('clickBrick', (e) => this.clickBrick(e))

    this.shadowRoot.querySelector('.play').addEventListener('click', (e) => this.startGame(e))
  }

  disconnectedCallback () {
    this.shadowRoot.removeEventListener('clickBrick', (e) => this.clickBrick(e))

    this.shadowRoot.querySelector('.play').removeEventListener('click', (e) => this.startGame(e))
  }

  startGame (e) {
    const gridSizeChoice = this.shadowRoot.querySelector('input[name=gridSize]:checked').value
    let columns = 0
    let rows = 0
    switch (gridSizeChoice) {
      case '4by4':
        this.populateArray(9)
        columns = 4
        rows = 4
        break
      case '2by2':
        this.populateArray(3)
        columns = 2
        rows = 2
        break
      case '2by4':
        this.populateArray(5)
        columns = 2
        rows = 4
        break
    }

    this.shuffleImages()
    this.displayMemoryGridNew()
    this.shadowRoot.querySelector('.memoryMenu').style.display = 'none'

    this.setGrid(columns, rows)
    this.shadowRoot.querySelector('.memoryGrid').style.display = 'grid'
    // console.log(gridSize)
  }

  setGrid (columns, rows) {
    let gridCols = ''
    let gridRows = ''
    for (let i = 0; i < columns; i++) {
      gridCols += 'calc(100% / ' + columns + ') '
    }
    for (let i = 0; i < rows; i++) {
      gridRows += 'calc(100% / ' + rows + ') '
    }
    this.shadowRoot.querySelector('.memoryGrid').style.gridTemplateColumns = gridCols
    this.shadowRoot.querySelector('.memoryGrid').style.gridTemplateRows = gridRows
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
    if (this._revealed.size < 2 && !this._revealed.get(e.detail.id)) {
      if (!this._revealed.delete(e.detail.id)) {
        this.shadowRoot.getElementById(e.detail.id).toggleView(e)
        this._revealed.set(e.detail.id, e.detail.img)
        if (this._revealed.size === 2) {
          this.checkMatch()
          console.log('jadå', this._revealed.keys())
        }
      }
    } else {
      // this.shadowRoot.getElementById(e.detail.id).toggleView(e)
      // this._revealed.delete(e.detail.id)
      // this.checkMatch()
      // this._revealed.clear()
    }
  }

  checkMatch () {
    const arr = Array.from(this._revealed.values())
    console.log('arg', arr)
    if (arr[0] === arr[1]) {
      console.log(arr[0])
      console.log('WIN')
      this.clearGrid(true)
    } else {
      console.log('uhoh')
      console.log('double WTF', this._revealed)
      // setTimeout(this.clearGrid, 2000)
      this.clearGrid(false)
    }
  }

  async clearGrid (match) {
    const arr = Array.from(this._revealed.keys())
    if (match) {
      await this.sleep(500)
      arr.forEach(el => {
        console.log(el)
        this.shadowRoot.getElementById(el).match()
        this._revealed.clear()
      })
    } else {
      console.log('wtf', this._revealed)
      console.log(this._revealed.keys())
      await this.sleep(1000)
      arr.forEach(el => {
        this.shadowRoot.getElementById(el).toggleView()
        this._revealed.clear()
      })
    }
  }

  sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

window.customElements.define('memory-application', MemoryApplication)
