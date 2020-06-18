const template = document.createElement('template')
template.innerHTML = `
<style>
div.chatContainer {
    width: 100%;
    height: 100%;
    background-color: #080808;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #B9B9B9;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
}

div.messageContainer {
    width: calc(100% - 10px);
    height: calc(100% - 80px);
    /*background-color: red;*/
}

div.inputContainer {
  width: calc(100% - 10px);
  height: 80px;
  /*background-color: blue;*/
  display: flex;
  justify-content: center;
}

ul.messageList {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

ul.messageList li {
    font-size: 0.8rem;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
}

.sender {
  font-size: 0.8rem;
  font-weight: 800;
}

.message {
  margin-left: 5px;
}

div.inputContainer form {
  width: calc(100% - 10px);
  margin: 0;
  padding: 0;
}

div.inputContainer textarea {
  font-family: 'Roboto', sans-serif;
  padding: 5px;
  width: calc(100% - 10px);
  height: calc(100% - 20px);
  border: 1px solid #222222;
  border-radius: 4px;
  background-color: #111111;
  font-size: 1.0rem;
  color: #B9B9B9;
  resize: none;
}

div.inputContainer textarea:focus {
  border: 1px solid #222222;
  border-radius: 4px;
  outline: none;
}
</style>
<div class="chatContainer">
    <div class="messageContainer">
    <!--JAG CHATTAR SOM EN GUD-->
    <ul class="messageList">
    <ul>
    </div>
    <div class="inputContainer">
      <form>
        <textarea></textarea>
      </form>
    <div>
</div>
`

export default class ChatApplication extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    /* this.shadowRoot.querySelector('h1').innerText = this.getAttribute('name') */
    this._websocket = new window.WebSocket('ws://vhost3.lnu.se:20080/socket/')
    this._apikey = 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
  }

  connectedCallback () {
    this.subscribeListeners()
    // this.testMessage()
    this.initializeChat()
  }

  disconnectedCallback () {
    this.unsubscribeListeners()
    this._websocket.close()
  }

  subscribeListeners () {
    this._websocket.addEventListener('message', (e) => this.receiveMessage(e))
    this._websocket.addEventListener('open', (e) => this.testMessage(e))
  }

  unsubscribeListeners () {
    this._websocket.removeEventListener('message', (e) => this.receiveMessage(e))
  }

  testMessage () {
    const testMsg = {
      type: 'message',
      data: 'The message text is sent using the data property',
      username: 'MyFancyUsername',
      channel: 'my, not so secret, channel',
      key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    }
    this._websocket.send(JSON.stringify(testMsg))
  }

  displayMessage (data) {
    const messageItem = document.createElement('li')
    const userName = document.createElement('span')
    userName.classList.add('sender')
    const msg = document.createElement('span')
    msg.classList.add('message')
    userName.innerText = data.username + ': '
    msg.innerText = data.data
    messageItem.appendChild(userName)
    messageItem.appendChild(msg)
    this.shadowRoot.querySelector('.messageList').appendChild(messageItem)
  }

  receiveMessage (e) {
    const receivedData = JSON.parse(e.data)
    if (receivedData.type === 'message' || receivedData.type === 'notification') {
      this.displayMessage(receivedData)
    }

    console.log('Msg from server: ' + e.data)
  }

  initializeChat () {
    const msg = {
      username: 'Chatterize',
      data: 'Welcome to chatterize!'
    }
    const msg2 = {
      username: 'Chatterize',
      data: 'Connecting to server..'
    }
    this.displayMessage(msg)
    this.displayMessage(msg2)
  }
}

window.customElements.define('chat-application', ChatApplication)
