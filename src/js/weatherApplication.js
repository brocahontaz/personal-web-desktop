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
  /*justify-content: space-between;*/
}

div.weatherInfoMain {
  display: flex;
  align-items: center;
  justify-content: center;
  /*background: red;*/
}

div.weatherText {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

div.additionalWeatherInfo {
  margin-top: 10px;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
}

div.additionalWeatherItem {
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 15px;
  padding-right: 15px;
  width: calc(100%-30px);
  display: grid;
  grid-template-columns: 1fr 1fr;
}

div.additionalWeatherItem:nth-child(2n) {
  background: #E7F0F7;
}

div.additionalWeatherItem span:nth-child(2n) {
  justify-self: end;
}

div.weatherMenu {
  width: 100%;
  height: 50px;
  background: #E7F0F7;
  display: flex;
  justify-content: center;
}

span.temperature {
  font-size: 1.5rem;
  font-weight: 800;
}

span.description {
  font-weight: 800;
}

button {
  height: 50px;
  /*width: 24px;*/
  background: #E7F0F7;
  box-shadow: 0px 0px 0px transparent;
  border: 0px solid transparent;
  text-shadow: 0px 0px 0px transparent;
  padding: 10px;
  margin: 0;
  color: #000;
  text-align: center;
  font-size: 1.2rem;
}

button:focus {
  /*background-color: rgba(255,255,255, 0);*/
  box-shadow: 0px 0px 0px transparent;
  border: 0px solid transparent;
  outline: 0;
  text-shadow: 0px 0px 0px transparent;
  padding: 10px;
  /*color: #B9B9B9;*/
  text-align: center;
}

button:hover {
  background: #d7e3ed;
}

button:active {
  background: #bccddb; 
  /*color: #E87288;*/
}

button.active {
  background: #fff;
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
      <!--<table id ="additionalWeatherInfo">
        <tr>
          <td></td>
          <td></td>
        <tr>
      </table>-->
      <div class="additionalWeatherInfo">
        <div id="wind" class="additionalWeatherItem"><span>Wind</span><span id="currentWind"></span></div>
        <div id="clouds" class="additionalWeatherItem"><span>Cloudiness</span><span id="currentClouds"></span></div>
        <div id="pressure" class="additionalWeatherItem"><span>Pressure</span><span id="currentPressure"></span></div>
        <div id="humidity" class="additionalWeatherItem"><span>Humidity</span><span id="currentHumidity"></span></div>
        <div id="precipitation" class="additionalWeatherItem"><span>Precipitation</span><span id="currentPrecipitation"></span></div>
        <div id="sunrise" class="additionalWeatherItem"><span>Sunrise</span><span id="currentSunrise"></span></div>
        <div id="sunset" class="additionalWeatherItem"><span>Sunset</span><span id="currentSunset"></span></div>
      </div>
      <div class="weatherMenu">
        <button id="currentButton">Current weather</button>
        <button id ="hourlyButton">Hourly forecast</button>
        <button id="dailyButton">Daily forecast</button>
      </div>
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
    this.shadowRoot.getElementById('currentButton').classList.add('active')
  }

  disconnectedCallback () {

  }

  async getCurrentWeather (city, countrycode) {
    const response = await window.fetch('http://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + countrycode + '&units=metric&appid=d7b1a89f9f2a034e861e9664548a6a92')
    const data = await response.json()

    this.getMainInfo(data)

    this.getTemp(data)

    this.getWind(data)

    this.getCloudiness(data)

    this.getPressure(data)

    this.getHumidity(data)

    this.getPrecipitation(data)

    this.getSunrise(data)

    this.getSunset(data)
  }

  async getHourlyForecast (city, countrycode) {}

  async getDailyForecast (city, countrycode) {}

  async testConnection () {
    const response = await window.fetch('http://api.openweathermap.org/data/2.5/weather?q=Malmo,se&units=metric&appid=d7b1a89f9f2a034e861e9664548a6a92')
    const data = await response.json()

    this.getMainInfo(data)

    this.getTemp(data)

    this.getWind(data)

    this.getCloudiness(data)

    this.getPressure(data)

    this.getHumidity(data)

    this.getPrecipitation(data)

    this.getSunrise(data)

    this.getSunset(data)
  }

  getMainInfo (data) {
    this.shadowRoot.querySelector('.weatherHeadline').innerText = data.name
    this.getWeatherIcon(data)
    this.getWeatherDescription(data)
  }

  getWeatherIcon (data) {
    const iconUrl = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png'
    this.shadowRoot.querySelector('.weatherIcon').setAttribute('src', iconUrl)

    return iconUrl
  }

  getWeatherDescription (data) {
    let descString = data.weather[0].description
    descString = descString.charAt(0).toUpperCase() + descString.slice(1)
    this.shadowRoot.querySelector('.description').innerHTML = descString

    return descString
  }

  getTemp (data) {
    this.shadowRoot.querySelector('.temperature').innerHTML = data.main.temp + ' °C'
    this.shadowRoot.querySelector('.feelsLikeTemp').innerHTML = data.main.feels_like

    const tempData = { temp: data.maintemp + ' °C', feels_like: data.mainfeels_like + ' °C' }

    return tempData
  }

  getWind (data) {
    const windSpeed = this.getWindName(data.wind.speed) + ' ' + data.wind.speed + ' m/s ' + this.getWindDirection(data.wind.deg)
    this.shadowRoot.getElementById('currentWind').innerHTML = windSpeed

    return windSpeed
  }

  getCloudiness (data) {
    let cloudiness = data.clouds.all

    if (cloudiness < 11) {
      cloudiness = 'Clear'
    } else if (cloudiness < 25) {
      cloudiness = 'Few clouds'
    } else if (cloudiness < 50) {
      cloudiness = 'Scattered clouds'
    } else if (cloudiness < 85) {
      cloudiness = 'Broken clouds'
    } else {
      cloudiness = 'Overcast clouds'
    }

    this.shadowRoot.getElementById('currentClouds').innerHTML = cloudiness

    return cloudiness
  }

  getPressure (data) {
    const pressure = data.main.pressure + ' hpa'
    this.shadowRoot.getElementById('currentPressure').innerHTML = pressure

    return pressure
  }

  getHumidity (data) {
    const humidity = data.main.humidity + ' %'
    this.shadowRoot.getElementById('currentHumidity').innerHTML = humidity

    return humidity
  }

  getPrecipitation (data) {
    let precipitationValue = '0'
    if (data.sys.rain) {
      precipitationValue = data.sys.rain['1h']
    } else if (data.sys.snow) {
      precipitationValue = data.sys.snow['1h']
    }

    precipitationValue += ' mm/h'
    this.shadowRoot.getElementById('currentPrecipitation').innerHTML = precipitationValue

    return precipitationValue
  }

  getSunrise (data) {
    const sunriseTime = new Date(data.sys.sunrise * 1000)
    let sunriseHr = sunriseTime.getHours()
    if (sunriseHr < 10) {
      sunriseHr = '0' + sunriseHr
    }
    let sunriseMin = sunriseTime.getMinutes()
    if (sunriseMin < 10) {
      sunriseMin = '0' + sunriseMin
    }
    const sunrise = sunriseHr + ':' + sunriseMin
    this.shadowRoot.getElementById('currentSunrise').innerHTML = sunrise

    return sunrise
  }

  getSunset (data) {
    const sunsetTime = new Date(data.sys.sunset * 1000)
    let sunsetHr = sunsetTime.getHours()
    if (sunsetHr < 10) {
      sunsetHr = '0' + sunsetHr
    }
    let sunsetMin = sunsetTime.getMinutes()
    if (sunsetMin < 10) {
      sunsetMin = '0' + sunsetMin
    }

    const sunset = sunsetHr + ':' + sunsetMin
    this.shadowRoot.getElementById('currentSunset').innerHTML = sunset

    return sunset
  }

  getWindName (speed) {
    const arr = ['Calm', 'Light air', 'Light breeze', 'Gentle breeze', 'Moderate breeze', 'Fresh breeze', 'Strong breeze', 'Moderate gale', 'Fresh gale', 'Strong gale', 'Whole gale', 'Storm', 'Hurricane']

    if (speed <= 0.2) {
      return arr[0]
    } else if (speed <= 1.5) {
      return arr[1]
    } else if (speed <= 3.3) {
      return arr[2]
    } else if (speed <= 5.4) {
      return arr[3]
    } else if (speed <= 7.9) {
      return arr[4]
    } else if (speed <= 10.7) {
      return arr[5]
    } else if (speed <= 13.8) {
      return arr[6]
    } else if (speed <= 17.1) {
      return arr[7]
    } else if (speed <= 20.7) {
      return arr[8]
    } else if (speed <= 24.4) {
      return arr[9]
    } else if (speed <= 28.4) {
      return arr[10]
    } else if (speed <= 32.6) {
      return arr[11]
    } else {
      return arr[12]
    }
  }

  getWindDirection (degrees) {
    const val = Math.floor((degrees / 22.5) + 0.5)
    const arr = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
    return arr[(val % 16)]
  }
}

window.customElements.define('weather-application', WeatherApplication)
