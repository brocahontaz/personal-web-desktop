const template = document.createElement('template')
template.innerHTML = `
<head>
<link rel="stylesheet" href="../css/font-awesome-4.7.0/css/font-awesome.css">
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
    /*border-radius: 0px 0px 7px 7px;*/
}

div.messageContainer {
    width: calc(100% - 10px);
    height: calc(100% - 90px);
    max-width: calc(100% - 10px);
    max-height: calc(100% - 90px);
    /*background-color: red;*/
    overflow: auto;
}

div.inputContainer {
  width: calc(100% - 10px);
  height: 120px;
  margin: 0;
  padding: 0;
  background-color: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
}

div.inputContainer .actions {
  width: 100%;
  height: 30px;
  margin-top: 5px;
  font-size: 1.2rem;
  display: grid;
  grid-template-columns: 50% 50%;
}

div.inputContainer .settings {
  display: flex;
  padding-left: 10px;
}

div.inputContainer .senders {
  display: flex;
  justify-content: flex-end;
  background-color: none;
  padding-right: 10px;
}

ul.messageList {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

ul.messageList li {
    font-size: 0.9rem;
    margin: 0;
    padding: 0;
    /*display: flex;
    flex-direction: row;*/
}

.sender {
  font-size: 0.8rem;
  font-weight: 800;
}

.message {
  margin-left: 5px;
}

div.inputContainer form {
  width: 100%;
  height: calc(100% - 32px);
  margin: 0;
  padding: 0;
}

div.inputContainer .inputContent {
  width: calc(100% - 12px);
  height: calc(100% - 12px);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

div.inputContainer textarea {
  font-family: 'Roboto', sans-serif;
  padding: 5px;
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  border: 1px solid #222222;
  border-radius: 4px;
  background-color: #111111;
  font-size: 1.0rem;
  color: #B9B9B9;
  resize: none;
}

div.inputContainer textarea:focus {
  border: 1px solid #222222;
  border-radius: 6px;
  outline: none;
}

div.inputContainer input {
  font-family: 'Roboto', sans-serif;
  padding: 5px;
  width: calc(100% - 10px);
  height: 1.0rem;
  border: 1px solid #222222;
  border-radius: 4px;
  background-color: #111111;
  font-size: 1.0rem;
  color: #B9B9B9;
  resize: none;
}

div.inputContainer input:focus {
  border: 1px solid #222222;
  border-radius: 6px;
  outline: none;
}

button {
  height: 24px;
  /*width: 24px;*/
  background-color: rgba(0,0,0,0);
  box-shadow: 0px 0px 0px transparent;
  border: 0px solid transparent;
  border-radius: 12px;
  text-shadow: 0px 0px 0px transparent;
  padding: 0;
  margin: 0;
  color: #B9B9B9;
  text-align: center;
  font-size: 1.2rem;
}

button:focus {
  background-color: rgba(255,255,255, 0);
  box-shadow: 0px 0px 0px transparent;
  border: 0px solid transparent;
  outline: 0;
  text-shadow: 0px 0px 0px transparent;
  padding: 0;
  color: #B9B9B9;
  text-align: center;
}

button:hover {
  color: #ffffff;
}

button:active {
  color: #E87288;
}

button#send {
  
}
</style>
</head>
<div class="chatContainer">
    <div class="messageContainer">
    <!--JAG CHATTAR SOM EN GUD-->
    <ul class="messageList">
    <ul>
    </div>
    <div class="inputContainer">
        <div class="inputContent">
        <input type="text" id="username" placeholder="Please enter username..">
        <input type="text" id="channel" placeholder="Please enter channel..">
        <textarea id="msgInput" placeholder="Write something.."></textarea>
        </div>
        <div class="actions">
          <div class="settings">
            <button id="settings"><i class="fa fa-cog"></i></button>
          </div>
          <div class="senders">
            <button id="save"><i class="fa fa-check"></i></button>
            <button id="send"><i class="fa fa-paper-plane"></i></button>
          </div>
        </div>
    <div>
</div>
`

/**
 * Webcomponent module for the chat application
 *
 * @export the application
 * @class ChatApplication
 * @extends {window.HTMLElement}
 */
export default class ChatApplication extends window.HTMLElement {
  /**
   *Creates an instance of ChatApplication.
   * @memberof ChatApplication
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this._websocket = new window.WebSocket('ws://vhost3.lnu.se:20080/socket/')
    this._apikey = 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    this._username = window.localStorage.getItem('username') || ''
    this._username = window.localStorage.getItem('username') || ''
    this._channel = window.localStorage.getItem('channel') || 'testchannel'
    this._settingsActive = false
    this._titleUpdate = new window.CustomEvent('titleUpdate', {
      bubbles: true,
      cancelable: true,
      detail: { title: this._channel }
    })
  }

  /**
   * Connected callback, called when element is created
   * Adding event listeners
   * Initializing chat
   * Dispatch title update event
   *
   * @memberof ChatApplication
   */
  connectedCallback () {
    this.subscribeListeners()
    this.initializeChat()

    if (!this._channel || this._channel !== '') {
      this.dispatchEvent(this._titleUpdate)
    }
  }

  /**
   * Disconnected callback, called when element is destroyed
   * Removing event listeners
   * Closing websocket connection
   *
   * @memberof ChatApplication
   */
  disconnectedCallback () {
    this.unsubscribeListeners()
    this._websocket.close()
  }

  /**
   * Attribute changed callback, called when attribute is changed
   *
   * @param {*} name
   * @param {*} oldValue
   * @param {*} newValue
   * @memberof ChatApplication
   */
  attributeChangedCallback (name, oldValue, newValue) {
    this.updateApp()
  }

  // The observed attributes
  static get observedAttributes () { return ['channel'] }

  /**
   * Add event listeners
   *
   * @memberof ChatApplication
   */
  subscribeListeners () {
    this._websocket.addEventListener('message', (e) => this.receiveMessage(e))
    this.shadowRoot.getElementById('msgInput').addEventListener('keypress', (e) => this.enterMessage(e))
    this.shadowRoot.getElementById('send').addEventListener('click', (e) => this.enterMessage(e))
    this.shadowRoot.getElementById('settings').addEventListener('click', (e) => this.toggleSettings(e))
    this.shadowRoot.getElementById('save').addEventListener('click', (e) => this.saveSettings(e))
  }

  /**
   * Remove event listeners
   *
   * @memberof ChatApplication
   */
  unsubscribeListeners () {
    this._websocket.removeEventListener('message', (e) => this.receiveMessage(e))
    this.shadowRoot.getElementById('msgInput').removeEventListener('keypress', (e) => this.enterMessage(e))
    this.shadowRoot.getElementById('send').removeEventListener('click', (e) => this.enterMessage(e))
    this.shadowRoot.getElementById('settings').removeEventListener('click', (e) => this.toggleSettings(e))
    this.shadowRoot.getElementById('save').removeEventListener('click', (e) => this.saveSettings(e))
  }

  /**
   * Get entered message and send it
   *
   * @param {Event} e the event
   * @memberof ChatApplication
   */
  enterMessage (e) {
    if (!e.shiftKey && (e.key === 'Enter' || e.button === 0) && this.shadowRoot.getElementById('msgInput').value.trim() !== '') {
      const msgText = this.shadowRoot.getElementById('msgInput').value.trim()
      const message = {
        type: 'message',
        data: msgText,
        username: this._username,
        channel: this._channel,
        key: this._apikey
      }
      this.shadowRoot.getElementById('msgInput').value = ''
      this.shadowRoot.getElementById('msgInput').blur()
      this.sendMessage(message)
    }
  }

  /**
   * Toggle the settings menu
   *
   * @param {*} e
   * @memberof ChatApplication
   */
  toggleSettings (e) {
    if (!this._settingsActive) {
      this.shadowRoot.getElementById('msgInput').style.display = 'none'
      this.shadowRoot.getElementById('send').style.display = 'none'
      this.shadowRoot.getElementById('settings').style.display = 'block'
      this.shadowRoot.getElementById('save').style.display = 'block'
      this.shadowRoot.getElementById('username').style.display = 'block'
      this.shadowRoot.getElementById('channel').style.display = 'block'
      this._settingsActive = true
    } else {
      this.displayMessageInput()
      this._settingsActive = false
    }
  }

  /**
   * Display a test message
   *
   * @memberof ChatApplication
   */
  testMessage () {
    const testMsg = {
      type: 'message',
      data: 'The message text is sent using the data property',
      username: 'MyFancyUsername',
      channel: 'my, not so secret, channel',
      key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    }
    this.sendMessage(testMsg)
  }

  /**
   * Display message
   *
   * @param {Object} data the mesage data
   * @memberof ChatApplication
   */
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

  /**
   * Parse received message
   *
   * @param {Event} e the event
   * @memberof ChatApplication
   */
  receiveMessage (e) {
    const receivedData = JSON.parse(e.data)
    if ((receivedData.type === 'message' && receivedData.channel === this._channel) || receivedData.type === 'notification') {
      this.displayMessage(receivedData)
    }
    if (receivedData.type === 'notification') {
      if (this.checkActiveUser()) {
        this.connectedMessage()
      }
    }
  }

  /**
   * Send a message to the server
   *
   * @param {Object} data the message data
   * @memberof ChatApplication
   */
  sendMessage (data) {
    this._websocket.send(JSON.stringify(data))
  }

  /**
   * Initialize the chat app, displaying messages etc
   *
   * @memberof ChatApplication
   */
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

    // If no active user, show settings for username / channel input
    if (!this.checkActiveUser()) {
      this.displaySettings()
      // Otherwise show latest used channel with latest used username
    } else {
      this.displayMessageInput()
      this.shadowRoot.getElementById('username').value = this._username
      this.shadowRoot.getElementById('channel').value = this._channel
    }
  }

  /**
   * Display connect message
   *
   * @param {Event} e the event
   * @memberof ChatApplication
   */
  connectedMessage (e) {
    const msg = {
      username: 'Chatterize',
      data: 'Connected to channel ' + this._channel + ', as user ' + this._username
    }

    this.displayMessage(msg)
  }

  /**
   * Display the settings menu
   *
   * @memberof ChatApplication
   */
  displaySettings () {
    this.shadowRoot.getElementById('msgInput').style.display = 'none'
    this.shadowRoot.getElementById('send').style.display = 'none'
    this.shadowRoot.getElementById('settings').style.display = 'none'
    this.shadowRoot.getElementById('save').style.display = 'block'
    this.shadowRoot.getElementById('username').style.display = 'block'
    this.shadowRoot.getElementById('channel').style.display = 'block'
  }

  /**
   * Display the message input
   *
   * @param {String} channel the chat channel
   * @memberof ChatApplication
   */
  displayMessageInput (channel) {
    this.shadowRoot.getElementById('msgInput').style.display = 'block'
    this.shadowRoot.getElementById('send').style.display = 'block'
    this.shadowRoot.getElementById('settings').style.display = 'block'
    this.shadowRoot.getElementById('save').style.display = 'none'
    this.shadowRoot.getElementById('username').style.display = 'none'
    this.shadowRoot.getElementById('channel').style.display = 'none'
  }

  /**
   * Display the channel picker
   *
   * @memberof ChatApplication
   */
  displayChannelPicker () {
    this.shadowRoot.getElementById('msgInput').style.display = 'none'
    this.shadowRoot.getElementById('send').style.display = 'none'
    this.shadowRoot.getElementById('settings').style.display = 'none'
    this.shadowRoot.getElementById('save').style.display = 'block'
    this.shadowRoot.getElementById('username').style.display = 'none'
    this.shadowRoot.getElementById('channel').style.display = 'block'
  }

  /**
   * Check if there's an active user
   *
   * @returns boolean true if user exists, false otherwise
   * @memberof ChatApplication
   */
  checkActiveUser () {
    const user = window.localStorage.getItem('username')
    console.log(window.localStorage.getItem('username'))
    return user && user !== '' && this._username && this._username !== ''
  }

  /**
   * Save settings for the chat app
   * Dispatches event for window title update
   *
   * @param {Event} e the event
   * @memberof ChatApplication
   */
  saveSettings (e) {
    const username = this.shadowRoot.getElementById('username').value.trim()
    const channel = this.shadowRoot.getElementById('channel').value.trim()

    if (username !== '' && channel !== '') {
      window.localStorage.setItem('username', username)
      window.localStorage.setItem('channel', channel)
      this._channel = channel
      this._username = username
      this.shadowRoot.getElementById('username').value = username
      this.shadowRoot.getElementById('channel').value = channel
      this.displayMessageInput(channel)
      this.connectedMessage()
      const dispatcher = this._titleUpdate = new window.CustomEvent('titleUpdate', {
        bubbles: true,
        cancelable: true,
        detail: { title: this._channel }
      })
      this.dispatchEvent(dispatcher)
    }
  }
}

window.customElements.define('chat-application', ChatApplication)
