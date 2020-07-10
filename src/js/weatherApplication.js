const template = document.createElement('template')
template.innerHTML = `
<style>
div {
  font-family: 'Roboto', sans-serif;
  font-size: 1.0rem;
}
div.weatherContainer {
  width: 100%;
  height: 100%;
  background: #ffffff;
}
div.weatherDisplay {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 10% 90%;
  justify-items: center;
}
div.weatherHeadline {
  width: 100%;
  height: 100%;
  font-size: 1.8rem;
  background: #dbdbdb;
  display: flex;
  justify-content: center;
  align-items: center;
}

div.weatherInfo {
  max-width: 800px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

div.weatherInfoMain {
  display: flex;
  align-items: center;
  justify-content: center;
  background: red;
}

div.weatherText {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

span.temperature {
  font-size: 1.5rem;
}

span.description {

}
</style>
<div class="weatherContainer">
  <div class="weatherDisplay">
    <div class="weatherHeadline">
    </div>
    <div class="weatherInfo">
      <div class="weatherInfoMain">
        <img class="weatherIcon">
        <div class="weatherText">
          <span class="temperature"></span>
          <div class="temperatureInfo">Feels like <span class="feelsLikeTemp"></span> °C</div>
        </div>
      </div>
      <span class="description"></span>
    </div>
  </div>
</div>
`

export default class WeatherApplication extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }

  connectedCallback () {
    this.testConnection()
  }

  disconnectedCallback () {

  }

  async testConnection () {
    const response = await window.fetch('http://api.openweathermap.org/data/2.5/weather?q=Malmo,se&units=metric&appid=d7b1a89f9f2a034e861e9664548a6a92')
    const myJson = await response.json()
    console.log(myJson)
    console.log(myJson.main)
    console.log(myJson.weather)
    this.shadowRoot.querySelector('.weatherHeadline').innerText = myJson.name

    const iconUrl = 'http://openweathermap.org/img/wn/' + myJson.weather[0].icon + '@2x.png'
    this.shadowRoot.querySelector('.weatherIcon').setAttribute('src', iconUrl)
    this.shadowRoot.querySelector('.description').innerHTML = myJson.weather[0].description
    this.shadowRoot.querySelector('.temperature').innerHTML = myJson.main.temp + ' °C'
    this.shadowRoot.querySelector('.feelsLikeTemp').innerHTML = myJson.main.feels_like
  }
}

window.customElements.define('weather-application', WeatherApplication)
