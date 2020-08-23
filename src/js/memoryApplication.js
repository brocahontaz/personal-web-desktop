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
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

div.memoryContainer .memoryGame {
  width: 100%;
  height: 100%;
  display: none;
  grid-template-rows: 10% 90%;
  justify-items: center;
  align-items: center;
  /*background: red;*/
}

div.memoryContainer .memoryMenu {
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  display: grid;
  grid-template-rows: 70% 30%;
  user-select: none;
}

div.memoryContainer .memoryMenu .highScore {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
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

div.memoryContainer .memoryMenu .actionMenu .choices {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

div.memoryContainer .timerAndClicks {
  display: none;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-end;
  width: 100%;
  height: 100%;
}

div.memoryContainer .memoryGame .memoryGrid {
    width: calc(90% - 20px);
    height: calc(90% - 20px);
    max-width: 800px;
    max-height: 800px;
    display: none;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    justify-items: center;
    align-items: center;
    /*background: blue;*/
}

div.memoryContainer .result {
    display: none;
    flex-direction: column;
    /*background: blue;*/
}

div.memoryContainer .result .enterName {
    width: 100%;
    display: grid;
    grid-template-columns: 70% 30%;
    /*background: blue;*/
}

div.memoryContainer .result .enterName input {
    width: 100%;
    /*background: blue;*/
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

h2 {
  font-size: 2.0rem;
  line-height: 2.1rem;
  padding: 0;
  margin: 0;
}

ol {
  padding: 0;
  margin: 0;
}
</style>
<div class="memoryContainer">
    <div class="memoryMenu">
      <div class="highScore">
          <div class="result">
            <h2>Good job!</h2>
            <div>
              <span class="end">Your score was</span>
              <span class="endScore"></span>
              with a total time of
              <span class="totalTime"></span> seconds and 
              <span class="totalClicks"></span> clicks.
            </div>
            <div class="enterName">
              <input type="text" id="name" placeholder="Please enter name for high score list..">
              <button class="saveScore">Save</button>
            </div>
          </div>
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
    <div class="memoryGame">
      <div class="timerAndClicks">
        <div class="timer">
          Timer: 
          <span id="timer">0</span>
        </div>
        <div class="clicks">
          Clicks:
          <span id="clicks">0</span>
        </div>
      </div>
      <div class="memoryGrid">
      </div>
    </div>
<div>
`

/**
 * Webcomponent module for the memory application
 *
 * @export
 * @class MemoryApplication
 * @extends {window.HTMLElement}
 */
export default class MemoryApplication extends window.HTMLElement {
  /**
   *Creates an instance of MemoryApplication.
   * @memberof MemoryApplication
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this._imageArray = []
    this._revealed = new Map()
    this._nbrOfClicks = 0
    this._startTime = null
    this._endTime = null
    this._testInterval = null
    this._elapsed = 1
    this._finished = false
    this._matches = 0
    this._scoreMultiplier = 0
    this._currentScore = 0
    this._rows = 0
    this._columns = 0
    this._over = false
  }

  /**
   * Connected callback, called when element is created
   * Adding event listeners
   *
   * @memberof MemoryApplication
   */
  connectedCallback () {
    this.populateScores()

    this.shadowRoot.addEventListener('clickBrick', (e) => this.clickBrick(e))

    this.shadowRoot.querySelector('.play').addEventListener('click', (e) => this.startGame(e))

    this.shadowRoot.querySelector('.saveScore').addEventListener('click', (e) => this.saveScore(e))

    this.shadowRoot.getElementById('name').addEventListener('click', (e) => { this.shadowRoot.getElementById('name').focus() })

    this.shadowRoot.querySelector('.memoryGrid').addEventListener('keypress', (e) => this.move(e))
  }

  /**
   * Disconnected callback, called when element ins destroyed
   * Removing event listeners
   *
   * @memberof MemoryApplication
   */
  disconnectedCallback () {
    this.shadowRoot.removeEventListener('clickBrick', (e) => this.clickBrick(e))

    this.shadowRoot.querySelector('.play').removeEventListener('click', (e) => this.startGame(e))

    this.shadowRoot.querySelector('.saveScore').removeEventListener('click', (e) => this.saveScore(e))

    this.shadowRoot.getElementById('name').removeEventListener('click', (e) => { this.shadowRoot.getElementById('name').focus() })

    this.shadowRoot.querySelector('.memoryGrid').removeEventListener('keypress', (e) => this.move(e))
  }

  /**
   * Move in the grid
   *
   * @param {Event} e the event
   * @memberof MemoryApplication
   */
  move (e) {
    e.preventDefault()
    e.stopPropagation()
    const currentTarget = this.shadowRoot.activeElement
    const currentId = parseInt(currentTarget.id)
    let up = -this._columns
    let down = this._columns
    let left = -1
    let right = 1

    // Get correct next brick to move to depending on current position
    // Cycling when at an endpoint
    if (currentId < this._columns) {
      up = (this._rows - 1) * (this._columns)
    }

    if (currentId >= (this._rows - 1) * (this._columns)) {
      down = -(this._rows - 1) * (this._columns)
    }

    if (currentId === 0) {
      left = this._columns * this._rows - 1
    }

    if (currentId === this._columns * this._rows - 1) {
      right = -currentId
    }

    // Move in the grid, with keys
    switch (e.code) {
      case 'KeyW':
        this.shadowRoot.getElementById(currentId + up).focus()
        break
      case 'KeyS':
        this.shadowRoot.getElementById(currentId + down).focus()
        break
      case 'KeyA':
        this.shadowRoot.getElementById(currentId + left).focus()
        break
      case 'KeyD':
        this.shadowRoot.getElementById(currentId + right).focus()
        break
    }
  }

  /**
   * Start the game
   *
   * @param {Event} e the event
   * @memberof MemoryApplication
   */
  startGame (e) {
    this.resetGame()
    this._testInterval = setInterval(this.testTimer.bind(this), 1000)
    this._startTime = Date.now()
    const gridSizeChoice = this.shadowRoot.querySelector('input[name=gridSize]:checked').value

    // Get proper img array, grid size, score multiplier, according to user choice
    switch (gridSizeChoice) {
      case '4by4':
        this.populateArray(9)
        this._columns = 4
        this._rows = 4
        this._matches = 4 * 4
        this._scoreMultiplier = 100
        break
      case '2by2':
        this.populateArray(3)
        this._columns = 2
        this._rows = 2
        this._matches = 2 * 2
        this._scoreMultiplier = 10
        break
      case '2by4':
        this.populateArray(5)
        this._columns = 2
        this._rows = 4
        this._matches = 2 * 4
        this._scoreMultiplier = 20
        break
    }

    // Shuffle images and display brick grid
    this.shuffleImages()
    this.displayMemoryGridNew()
    this.shadowRoot.querySelector('.memoryMenu').style.display = 'none'

    this.setGrid(this._columns, this._rows)
    this.shadowRoot.querySelector('.memoryGame').style.display = 'grid'
    this.shadowRoot.querySelector('.memoryGrid').style.display = 'grid'

    this.shadowRoot.querySelector('.timerAndClicks').style.display = 'flex'

    this.shadowRoot.querySelector('.memoryGrid').firstElementChild.focus()
  }

  /**
   * Set the grid size
   *
   * @param {int} columns the number of columns
   * @param {int} rows the number of rows
   * @memberof MemoryApplication
   */
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

  /**
   * Put images in array
   *
   * @param {*} images
   * @memberof MemoryApplication
   */
  populateArray (images) {
    this._imageArray = [...Array(images).keys(), ...Array(images).keys()].filter(img => img !== 0).map(nbr => `${nbr}.png`)
    console.log('arr', this._imageArray)
  }

  /**
   * Shuffle the images
   *
   * @memberof MemoryApplication
   */
  shuffleImages () {
    for (let i = this._imageArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i)
      const temp = this._imageArray[i]
      this._imageArray[i] = this._imageArray[j]
      this._imageArray[j] = temp
    }
  }

  /**
   * Display the memory grid, with the bricks
   *
   * @memberof MemoryApplication
   */
  displayMemoryGridNew () {
    let itr = 0
    this._imageArray.forEach(element => {
      const brick = document.createElement('memory-brick')
      brick.setAttribute('img', element)
      brick.id = itr++
      this.shadowRoot.querySelector('.memoryGrid').appendChild(brick)
    })
  }

  /**
   * Click brick event
   *
   * @param {Event} e the event
   * @memberof MemoryApplication
   */
  clickBrick (e) {
    e.stopPropagation()
    e.cancelBubble = true

    if (this._revealed.size < 2 && !this._revealed.get(e.detail.id)) {
      if (!this._revealed.delete(e.detail.id)) {
        if (!e.detail.matched) {
          this.incrementClicks()
        }

        this.shadowRoot.getElementById(e.detail.id).toggleView(e)
        this._revealed.set(e.detail.id, e.detail.img)

        // if 2 bricks clicked, check match
        if (this._revealed.size === 2) {
          this.checkMatch()
        }
      }
    }
  }

  /**
   * Check if turned bricks are matched
   *
   * @returns {boolean} true if matched, false otherwise
   * @memberof MemoryApplication
   */
  checkMatch () {
    const arr = Array.from(this._revealed.values())

    if (arr[0] === arr[1]) {
      this._imageArray = this._imageArray.filter(img => img !== arr[0])
      this.clearGrid(true)

      // if all images turned, game over
      if (this._imageArray.length === 0) {
        this.gameOver()
      }
      return true
    } else {
      this.clearGrid(false)
      return false
    }
  }

  /**
   * Increment the number of clicks
   *
   * @memberof MemoryApplication
   */
  incrementClicks () {
    this._nbrOfClicks++
    this.shadowRoot.getElementById('clicks').innerText = this._nbrOfClicks
  }

  /**
   * Test timer
   *
   * @memberof MemoryApplication
   */
  testTimer () {
    this.shadowRoot.getElementById('timer').innerText = this._elapsed++
    // console.log(Date.now())
  }

  /**
   * Game over, display proper stuff, calculate score etc
   *
   * @memberof MemoryApplication
   */
  gameOver () {
    clearInterval(this._testInterval)
    this.shadowRoot.querySelector('.memoryGame').style.display = 'none'
    this.shadowRoot.querySelector('.timerAndClicks').style.display = 'none'
    this.shadowRoot.querySelector('.memoryMenu').style.display = 'grid'
    this.shadowRoot.querySelector('.result').style.display = 'flex'

    this._endTime = Date.now()
    const playTime = this._endTime - this._startTime

    const score = Math.floor(this.calculateScore(playTime, this._nbrOfClicks))

    this.shadowRoot.querySelector('.endScore').innerText = score
    this.shadowRoot.querySelector('.totalTime').innerText = playTime / 1000
    this.shadowRoot.querySelector('.totalClicks').innerText = this._nbrOfClicks

    this._over = true
  }

  /**
   * Reset the game
   *
   * @memberof MemoryApplication
   */
  resetGame () {
    this._over = false
    this._currentScore = 0
    this._nbrOfClicks = 0
    this.shadowRoot.querySelector('.memoryGrid').innerHTML = ''
    this.shadowRoot.getElementById('timer').innerText = 1
    this.shadowRoot.getElementById('clicks').innerText = 0
  }

  /**
   * Calculate the score
   *
   * @param {int} playTime the playtime
   * @param {int} clicks the number of clicks
   * @returns {int} the score
   * @memberof MemoryApplication
   */
  calculateScore (playTime, clicks) {
    console.log(playTime)
    const score = (100 - clicks) / (playTime / 1000) * this._scoreMultiplier
    this._currentScore = score
    return score
  }

  /**
   * Save a new highscore
   *
   * @param {Event} e the event
   * @memberof MemoryApplication
   */
  saveScore (e) {
    this.shadowRoot.querySelector('.result').style.display = 'none'
    const name = this.shadowRoot.getElementById('name').value
    const scores = JSON.parse(window.localStorage.getItem('highScore') || '[]')

    const scoreItem = { userName: name, score: this._currentScore }
    scores.push(scoreItem)
    window.localStorage.setItem('highScore', JSON.stringify(scores))

    this.getHighScores()
    this.populateScores()
  }

  /**
   * Get the highscores, sorted, top 10
   *
   * @memberof MemoryApplication
   */
  getHighScores () {
    const scores = JSON.parse(window.localStorage.getItem('highScore') || '[]')
    const updatedScores = scores.sort((a, b) => b.score - a.score).slice(0, 10)
    window.localStorage.setItem('highScore', JSON.stringify(updatedScores))
  }

  /**
   * Populate high score list
   *
   * @memberof MemoryApplication
   */
  populateScores () {
    const list = this.shadowRoot.querySelector('.highScore ol')
    list.innerHTML = ''
    const scores = JSON.parse(window.localStorage.getItem('highScore') || '[]')
    scores.forEach(scoreItem => {
      const item = document.createElement('li')
      item.innerText = scoreItem.userName + ' - ' + Math.floor(scoreItem.score) + ' points'
      list.appendChild(item)
    })
  }

  /**
   * "Clear the grid" by hiding matched bricks, or turning unmatched bricks
   *
   * @param {boolean} match boolean, true if bricks are matched, false otherwise
   * @memberof MemoryApplication
   */
  async clearGrid (match) {
    const arr = Array.from(this._revealed.keys())
    if (match) {
      await this.sleep(500)
      arr.forEach(el => {
        this.shadowRoot.getElementById(el).match()
        this._revealed.clear()
      })
    } else {
      await this.sleep(1000)
      arr.forEach(el => {
        this.shadowRoot.getElementById(el).toggleView()
        this._revealed.clear()
      })
    }
  }

  /**
   * Help method for delay
   *
   * @param {int} ms delay milliseconds
   * @returns {Promise} the timeout
   * @memberof MemoryApplication
   */
  sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * Focus the next available brick
   *
   * @param {int} id id of current/last brick
   * @memberof MemoryApplication
   */
  focusNext (id) {
    if (id === this._columns * this._rows) {
      id = 0
    }
    if (!this.shadowRoot.getElementById(id).matched) {
      this.shadowRoot.getElementById(id).focus()
    } else if (!this._over) {
      this.focusNext(id)
    }
  }
}

window.customElements.define('memory-application', MemoryApplication)
