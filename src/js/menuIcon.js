const template = document.createElement('template')
template.innerHTML = `
<style>
div {
    width: 50px;
    height: 50px;
    /*border-radius: 4px;*/
    /*background-color: white;*/
    margin-right: 5px;
    /*cursor: pointer;*/
}
/*
div:hover {
    background: rgba(255,255,255,0.5);
}*/

div.iconContainer {
    width: 50px;
    height: 50px;
    /*border-radius: 4px;*/
    /*background-color: white;*/
    margin-right: 5px;
    cursor: pointer;
}

div.iconContainer:hover {
    background: rgba(255,255,255,0.5);

}

img {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    display: block;
    margin: 0 auto;
}

div.contextWrapper {
  position: absolute;
  top: -450px;
  height: 450px;
  background: none;
  display: none;
}

div.contextMenu {
  font-family: 'Roboto', sans-serif;
  position: absolute;
  bottom: 0;
  width: 250px;
  height: auto;
  overflow: auto;
  max-height: 450px;
  background: rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid #000000;
  display: none;
  cursor: auto;
  flex-direction: column;
  font-size: 0.9rem;
  padding: 0;
  color: #ffffff;
}

div.contextMenu span {
  padding: 15px;
}

div.contextMenu span:hover {
  background: rgba(255, 255, 255, 0.2);
}

div.contextMenu span .first {
  padding-top: 15px;
}

div.contextMenu hr {
  background: rgba(255, 255, 255, 0.2);
  height: 1px;
  border: 0;
  width: 50%;
  /*margin-left: 25%;*/
}

ul.contextOptions {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

ul.contextList {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: none;
}

ul.contextOptions li {
    font-size: 0.9rem;
    margin: 0;
    padding: 15px
}

ul.contextOptions li:hover {
  background: rgba(255, 255, 255, 0.2);
}

ul.contextList li {
    font-size: 0.9rem;
    margin: 0;
    padding: 15px 10px 10px 10px;
    /*display: flex;
    flex-direction: row;*/
}

ul.contextList li:hover{
  background: rgba(255, 255, 255, 0.2);
}
</style>
<div>
  <div class="contextWrapper">
    <div class="contextMenu">
      <ul class="contextList">        
      </ul>
      <span id="showAll">All windows</span>
      <hr>
      <ul class="contextOptions">
        <li id="newWindow">New window</li>
        <li id="minimizeAll">Minimize all windows</li>
        <li id="closeAll">Close all windows</li>
      </ul>
    </div>
  </div>
  <div class="iconContainer">
    <img>
  </div>
<!--<img>-->
</div>
`

export default class MenuIcon extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.shadowRoot.querySelector('img').setAttribute('src', this.getAttribute('src'))
    this._appname = this.getAttribute('appname')
    this._fullname = this.getAttribute('fullname')
    this._icon = this.getAttribute('src')
    this._instanceList = new window.Set()
    this._contextMenu = false
    this._clickEvent = new window.CustomEvent('menuIconClick', {
      bubbles: true,
      cancelable: true,
      detail: { icon: this._icon, fullname: this._fullname, appname: this._appname }
    })
    this._contextMenuEvent = new window.CustomEvent('displayContextMenu', {
      bubbles: true,
      cancelable: true,
      detail: { appname: this._appname, fullname: this._fullname }
    })
  }

  get appname () {
    return this._appname
  }

  get fullname () {
    return this._fullname
  }

  get icon () {
    return this._icon
  }

  connectedCallback () {
    console.log('connected icon')
    this.shadowRoot.querySelector('.iconContainer').addEventListener('click', (e) => this.onClick(e))
    this.shadowRoot.querySelector('.iconContainer').addEventListener('contextmenu', (e) => this.displayContextMenu(e))
    this.shadowRoot.getElementById('showAll').addEventListener('click', (e) => this.showAll(e))
    document.addEventListener('click', (e) => this.hideContext(e))
    document.addEventListener('contextmenu', (e) => this.hideContext(e))
  }

  disconnectedCallback () {
    this.shadowRoot.querySelector('.iconContainer').removeEventListener('click', (e) => this.onClick(e))
    this.shadowRoot.querySelector('.iconContainer').removeEventListener('contextmenu', (e) => this.displayContextMenu(e))
    this.shadowRoot.getElementById('showAll').removeEventListener('click', (e) => this.showAll(e))
    document.removeEventListener('click', (e) => this.hideContext(e))
    document.removeEventListener('contextmenu', (e) => this.hideContext(e))
  }

  onClick (e) {
    if (e.button === 0) {
      this.openWindow(e)
    } else if (e.button === 2) {
      this.displayContextMenu(e)
    }
  }

  openWindow (e) {
    console.log('HEJ')
    // document.querySelector('desktop-canvas').addWindow(this.icon, this.fullname, this.appname)
    this.hideContext(e)
    this.dispatchEvent(this._clickEvent)
  }

  displayContextMenu (e) {
    e.preventDefault()
    console.log('context')
    this.dispatchEvent(this._contextMenuEvent)
  }

  showContext (e, list) {
    console.log(list)
    // list.forEach(element => this.displayWindowInContext(element))
    if (this._contextMenu) {
      this._instanceList = list
      this.updateList()
      this.shadowRoot.querySelector('.contextMenu').style.display = 'none'
      this.shadowRoot.querySelector('.contextWrapper').style.display = 'none'
      this._contextMenu = false
    } else {
      this._instanceList = list
      this.updateList()
      this.shadowRoot.querySelector('.contextMenu').style.display = 'flex'
      this.shadowRoot.querySelector('.contextWrapper').style.display = 'flex'
      this._contextMenu = true
    }
  }

  updateList () {
    this.shadowRoot.querySelector('.contextList').innerHTML = ''
    this._instanceList.forEach(element => {
      console.log(element)
      const listElem = document.createElement('li')
      listElem.innerText = element + '. ' + this._fullname
      this.shadowRoot.querySelector('.contextList').appendChild(listElem)
    })
  }

  displayWindowInContext (element) {
    console.log(element)
    const listElem = document.createElement('li')
    listElem.innerText = element + '. ' + this._fullname
    this.shadowRoot.querySelector('.contextList').appendChild(listElem)
  }

  hideContext (e) {
    console.log('blalalal')
    if (e.target !== this) {
      // .log('jaha? ' + this._contextMenu)
      // console.log('nähä')
      this.shadowRoot.querySelector('.contextMenu').style.display = 'none'
      this.shadowRoot.querySelector('.contextWrapper').style.display = 'none'
      this._contextMenu = false
    }
  }

  showAll(e) {
    
  }
}

window.customElements.define('menu-icon', MenuIcon)
