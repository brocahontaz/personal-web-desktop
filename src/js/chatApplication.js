const template = document.createElement('template')
template.innerHTML = `
<style>
div.chatContainer {
    width: 100%;
    height: 100%;
    background-color: #ebebeb;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

div.messageContainer {
    width: calc(100% - 10px);
    height: calc(100% - 10px);

}

div.inputContainer {
    
}
</style>
<div class="chatContainer">
    <div class="messageContainer">
    JAG CHATTAR SOM EN GUD
    </div>
    <div class="inputContainer">
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
  }
}

window.customElements.define('chat-application', ChatApplication)
