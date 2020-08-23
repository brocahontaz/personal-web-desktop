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
  background: #E7F0F7;
  display: flex;
  justify-content: center;
  align-items: center;
}

div.searchField {
  height: 100%;
  background-color: #E7F0F7;
  display: flex;
}

div.searchField:hover {
  background: #d7e3ed;
}

div.weatherWrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

div.weatherInfo {
  max-width: 800px;
  width: 100%;
  /*height: 100%;*/
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

div.weatherForecast {
  width: 100%;
  max-width: 900px;
  display: none;
  overflow: auto;
}

ul.forecastList {
  width: 100%;
  padding: 0;
  margin: 0;
  margin-top: 15px;
}

ul.forecastList li {
  width: 100%;
  height: 80px;
  display: grid;
  grid-template-columns: 2fr 3fr;
  border-top: 1px dashed black;
}

ul.forecastList li div.day {
  display: flex;
  flex-direction: column;
}

ul.forecastList li div.dayHeader {
  padding-left: 10px;
  height: 40px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
}

ul.forecastList li div.today {
  margin-top: auto;
  color: grey;
  padding-bottom: 10px;
  padding-left: 10px;
  font-size: 0.9rem;
  font-style: italic;
  /*align-self: flex-end;*/
}

ul.forecastList li div.dayInfo {
  display: flex;
  flex-direction: column;  
}

div.dayInfo .temp {
  display: flex;
  width: 100%;
  padding-top: 10px;
  align-items: center;
}

span.dayTemp {
  color: #ffffff;
  font-size: 0.7rem;
  background-color: #EB795B;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 5px;
}

span.nightTemp {
  margin-left: 5px;
  color: #ffffff;
  font-size: 0.7rem;
  background-color: #58585A;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 5px;
}

span.forecastDesc {
  font-size: 0.9rem;
  font-style: italic;
  margin-left: 20px;
}

div.dayInfo .wind {
  margin-top: 5px;
  font-size: 0.9rem;
}

div.dayInfo .other {
  margin-top: 5px;
  font-size: 0.9rem;
}

ul.forecastList li:nth-child(2n) {
  /*background: #f4f4f4;*/
}

ul.forecastList li:first-child {
  border-top: none;
  background: #F1F1F1;
}

img.forecastIcon {
  width: 40px;
  height: 40px;
}

div.weatherMenu {
  margin-top: auto;
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

button.search {
  background: transparent;
  width: 40px;
  height: 100%;
  background-image: url('../image/search2.png');
  background-size: 20px 20px;
  background-repeat: no-repeat;
  background-position: center;
}

button.search:active {
  background: #bccddb; 
}

input[type=text] {
  background-color: transparent;
  padding: 0;
  padding-left: 10px;
  width: 200px;
  height: 100%;
  border: 0;
  font-size: 1.6rem;
  text-align: center;
}

input[type=text]:hover {
  background: #d7e3ed;
}

input[type=text]:focus {
  outline: none;
  border: 0;
}

input[type=text]:active {
  border: 0;
}
</style>
<div class="weatherContainer">
  <div class="weatherDisplay">
    <div class="weatherHeadline">
      <div class="searchField">
        <input type="text" placeholder="Search city (SE).." id="search">
        <button id="searchButton" class="search"></button>
      </div>
    </div>
    <div class="weatherWrapper">
      <div class="weatherInfo">
        <div class="weatherInfoMain">
          <img class="weatherIcon">
          <div class="weatherText">
            <span class="temperature"></span>
            <div class="temperatureInfo">Feels like <span class="feelsLikeTemp"></span></div>
          </div>
        </div>
        <span class="description"></span>
        <div class="additionalWeatherInfo">
          <div id="wind" class="additionalWeatherItem"><span>Wind</span><span id="currentWind"></span></div>
          <div id="clouds" class="additionalWeatherItem"><span>Cloudiness</span><span id="currentClouds"></span></div>
          <div id="pressure" class="additionalWeatherItem"><span>Pressure</span><span id="currentPressure"></span></div>
          <div id="humidity" class="additionalWeatherItem"><span>Humidity</span><span id="currentHumidity"></span></div>
          <div id="precipitation" class="additionalWeatherItem"><span>Precipitation</span><span id="currentPrecipitation"></span></div>
          <div id="sunrise" class="additionalWeatherItem"><span>Sunrise</span><span id="currentSunrise"></span></div>
          <div id="sunset" class="additionalWeatherItem"><span>Sunset</span><span id="currentSunset"></span></div>
        </div>
      </div>
      <div class="weatherForecast">
        <ul class="forecastList">
          
        </ul>
      </div>
      <div class="weatherMenu">
        <button id="currentButton">Current weather</button>
        <button id ="forecastButton">Weather Forecast</button>
      </div>
    </div>
  </div>
</div>
`

/**
 * Webcomponent module for the weather application
 *
 * @export
 * @class WeatherApplication
 * @extends {window.HTMLElement}
 */
export default class WeatherApplication extends window.HTMLElement {
  /**
   *Creates an instance of WeatherApplication.
   * @memberof WeatherApplication
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    // Get the last searched city from localstorage. If none, default to Malmö
    this._lastSearch = window.localStorage.getItem('weathercity') || 'Malmö'
  }

  /**
   * Connected callback, called when element is created
   * Adding event listeners
   *
   * @memberof WeatherApplication
   */
  connectedCallback () {
    this.shadowRoot.getElementById('currentButton').classList.add('active')

    this.shadowRoot.getElementById('search').addEventListener('keypress', (e) => this.search(e))
    this.shadowRoot.getElementById('currentButton').addEventListener('click', (e) => this.showCurrentWeather(e))
    this.shadowRoot.getElementById('forecastButton').addEventListener('click', (e) => this.showForecastWeather(e))

    this.initialize()
  }

  /**
   * Disconnected callback, called when element is destroyed
   * Removing event listeners
   *
   * @memberof WeatherApplication
   */
  disconnectedCallback () {
    this.shadowRoot.getElementById('search').removeEventListener('keypress', (e) => this.search(e))
    this.shadowRoot.getElementById('currentButton').removeEventListener('click', (e) => this.showCurrentWeather(e))
    this.shadowRoot.getElementById('forecastButton').removeEventListener('click', (e) => this.showForecastWeather(e))
  }

  /**
   * Initialize the weather application
   *
   * @memberof WeatherApplication
   */
  async initialize () {
    const latlon = await this.getCurrentWeather(this._lastSearch, 'SE')
    this.shadowRoot.getElementById('search').value = this._lastSearch
    this.getWeatherForecast(latlon.lat, latlon.lon)
  }

  /**
   * Get and display the current weather, and return latitude and longitude for the location
   *
   * @param {String} city the city
   * @param {String} countrycode the countrycode
   * @returns {Object} object containing lat, lon values
   * @memberof WeatherApplication
   */
  async getCurrentWeather (city, countrycode) {
    const response = await window.fetch('http://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + countrycode + '&units=metric&appid=d7b1a89f9f2a034e861e9664548a6a92')
    const data = await response.json()

    this.shadowRoot.querySelector('.weatherIcon').setAttribute('src', this.getWeatherIcon(data))

    this.shadowRoot.querySelector('.description').innerHTML = this.getWeatherDescription(data)

    const tempValues = this.getTemp(data)

    this.shadowRoot.querySelector('.temperature').innerHTML = tempValues.temp
    this.shadowRoot.querySelector('.feelsLikeTemp').innerHTML = tempValues.feels_like

    this.shadowRoot.getElementById('currentWind').innerHTML = this.getWind(data)

    this.shadowRoot.getElementById('currentClouds').innerHTML = this.getCloudiness(data)

    this.shadowRoot.getElementById('currentPressure').innerHTML = this.getPressure(data)

    this.shadowRoot.getElementById('currentHumidity').innerHTML = this.getHumidity(data)

    this.shadowRoot.getElementById('currentPrecipitation').innerHTML = this.getPrecipitation(data)

    this.shadowRoot.getElementById('currentSunrise').innerHTML = this.getSunrise(data)

    this.shadowRoot.getElementById('currentSunset').innerHTML = this.getSunset(data)

    return { lat: data.coord.lat, lon: data.coord.lon }
  }

  async getAllWeather (city, contrycode) {

  }

  /**
   * Get and display the weather forecast
   *
   * @param {int} lat the latitude
   * @param {int} lon the longitude
   * @memberof WeatherApplication
   */
  async getWeatherForecast (lat, lon) {
    const response = await window.fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude={current,minutely,hourly}&units=metric&appid=d7b1a89f9f2a034e861e9664548a6a92')
    const data = await response.json()

    let firstItem = true

    this.shadowRoot.querySelector('.forecastList').innerHTML = ''

    data.daily.forEach(day => {
      const listItem = document.createElement('li')
      const date = new Date(day.dt * 1000)
      const dateString = this.getFormattedDate(date.getDay(), date.getDate(), date.getMonth())
      const clouds = day.clouds
      const pressure = day.pressure
      const windSpeed = day.wind_speed
      const windDeg = day.wind_deg
      const dayTemp = day.temp.day
      const nightTemp = day.temp.night
      const desc = day.weather[0].description

      const dayDiv = document.createElement('div')
      dayDiv.classList.add('day')

      const dayHeader = document.createElement('div')
      dayHeader.classList.add('dayHeader')
      dayHeader.innerText = dateString
      const icon = document.createElement('img')
      icon.setAttribute('src', this.getWeatherIcon(day))
      icon.classList.add('forecastIcon')
      dayHeader.appendChild(icon)

      dayDiv.appendChild(dayHeader)
      if (firstItem) {
        firstItem = false

        const today = document.createElement('div')
        today.classList.add('today')
        today.innerText = 'Today'
        dayDiv.appendChild(today)
      }

      listItem.appendChild(dayDiv)

      const dayInfo = document.createElement('div')/* .classList.add('dayInfo') */
      dayInfo.classList.add('dayInfo')
      const temp = document.createElement('div')
      temp.classList.add('temp')

      const dayTempSpan = document.createElement('span')
      dayTempSpan.classList.add('dayTemp')
      dayTempSpan.innerHTML = dayTemp + ' °C'

      const nightTempSpan = document.createElement('span')
      nightTempSpan.classList.add('nightTemp')
      nightTempSpan.innerHTML = nightTemp + ' °C'

      const descSpan = document.createElement('span')
      descSpan.classList.add('forecastDesc')
      descSpan.innerHTML = desc

      temp.appendChild(dayTempSpan)
      temp.appendChild(nightTempSpan)
      temp.appendChild(descSpan)
      dayInfo.appendChild(temp)

      const windDiv = document.createElement('div')
      windDiv.classList.add('wind')
      windDiv.innerText = windSpeed + ' m/s ' + this.getWindDirection(windDeg)
      dayInfo.appendChild(windDiv)

      const other = document.createElement('div')
      other.classList.add('other')
      other.innerText = 'Clouds: ' + clouds + '%, ' + pressure + ' hpa'
      dayInfo.appendChild(other)

      listItem.appendChild(dayInfo)

      this.shadowRoot.querySelector('.forecastList').appendChild(listItem)
    })
  }

  async getHourlyForecast (city, countrycode) {}

  async getDailyForecast (city, countrycode) {}

  /**
   * Test method, testing connection, displaying etc
   *
   * @memberof WeatherApplication
   */
  async testConnection () {
    const response = await window.fetch('http://api.openweathermap.org/data/2.5/weather?q=Malmö,se&units=metric&appid=d7b1a89f9f2a034e861e9664548a6a92')
    const data = await response.json()

    this.shadowRoot.getElementById('search').value = data.name

    this.shadowRoot.querySelector('.weatherIcon').setAttribute('src', this.getWeatherIcon(data))

    this.shadowRoot.querySelector('.description').innerHTML = this.getWeatherDescription(data)

    const tempValues = this.getTemp(data)

    this.shadowRoot.querySelector('.temperature').innerHTML = tempValues.temp
    this.shadowRoot.querySelector('.feelsLikeTemp').innerHTML = tempValues.feels_like

    this.shadowRoot.getElementById('currentWind').innerHTML = this.getWind(data)

    this.shadowRoot.getElementById('currentClouds').innerHTML = this.getCloudiness(data)

    this.shadowRoot.getElementById('currentPressure').innerHTML = this.getPressure(data)

    this.shadowRoot.getElementById('currentHumidity').innerHTML = this.getHumidity(data)

    this.shadowRoot.getElementById('currentPrecipitation').innerHTML = this.getPrecipitation(data)

    this.shadowRoot.getElementById('currentSunrise').innerHTML = this.getSunrise(data)

    this.shadowRoot.getElementById('currentSunset').innerHTML = this.getSunset(data)
  }

  /**
   * Get the main weather info
   *
   * @param {Object} data the weather data
   * @memberof WeatherApplication
   */
  getMainInfo (data) {
    this.getWeatherIcon(data)
    this.getWeatherDescription(data)
  }

  /**
   * Get the weather icon
   *
   * @param {Object} data the weather data
   * @returns {String} the icon url
   * @memberof WeatherApplication
   */
  getWeatherIcon (data) {
    const iconUrl = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png'

    return iconUrl
  }

  /**
   * Get weather description
   *
   * @param {Object} data the weather object
   * @returns {String} the description
   * @memberof WeatherApplication
   */
  getWeatherDescription (data) {
    let descString = data.weather[0].description
    descString = descString.charAt(0).toUpperCase() + descString.slice(1)

    return descString
  }

  /**
   * Get the temperature
   *
   * @param {Object} data the weather object
   * @returns {String} the temperature
   * @memberof WeatherApplication
   */
  getTemp (data) {
    const tempData = { temp: data.main.temp + ' °C', feels_like: data.main.feels_like + ' °C' }

    return tempData
  }

  /**
   * Get the wind
   *
   * @param {Object} data the weather data
   * @returns {String} the wind
   * @memberof WeatherApplication
   */
  getWind (data) {
    const windSpeed = this.getWindName(data.wind.speed) + ' ' + data.wind.speed + ' m/s ' + this.getWindDirection(data.wind.deg)

    return windSpeed
  }

  /**
   * Get the cloudiness name
   *
   * @param {Object} data the weather data
   * @returns {String} the cloudiness
   * @memberof WeatherApplication
   */
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

    return cloudiness
  }

  /**
   * Get the pressure
   *
   * @param {Object} data the weather data
   * @returns {String} the pressure
   * @memberof WeatherApplication
   */
  getPressure (data) {
    const pressure = data.main.pressure + ' hpa'

    return pressure
  }

  /**
   * Get the humidity
   *
   * @param {Object} data the weather data
   * @returns {String} the humidity
   * @memberof WeatherApplication
   */
  getHumidity (data) {
    const humidity = data.main.humidity + ' %'

    return humidity
  }

  /**
   * Get the precipitation
   *
   * @param {Object} data the weather data
   * @returns {String} the precipitation
   * @memberof WeatherApplication
   */
  getPrecipitation (data) {
    let precipitationValue = '0'
    if (data.rain) {
      precipitationValue = data.rain['1h']
    } else if (data.snow) {
      precipitationValue = data.snow['1h']
    }

    precipitationValue += ' mm/h'

    return precipitationValue
  }

  /**
   * Get the sunrise time
   *
   * @param {Object} data the weather data
   * @returns {String} the sunrise time
   * @memberof WeatherApplication
   */
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

    return sunrise
  }

  /**
   * Get the sunset time
   *
   * @param {Object} data the weather data
   * @returns {String} the sunset time
   * @memberof WeatherApplication
   */
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

    return sunset
  }

  /**
   * Get the name of the wind from the speed
   *
   * @param {int} speed the wind speed
   * @returns {String} the wind name
   * @memberof WeatherApplication
   */
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

  /**
   * Get wind direction string from degrees
   *
   * @param {int} degrees the wind direction
   * @returns {String} the wind direction string
   * @memberof WeatherApplication
   */
  getWindDirection (degrees) {
    const val = Math.floor((degrees / 22.5) + 0.5)
    const arr = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
    return arr[(val % 16)]
  }

  /**
   * Search location
   *
   * @param {Event} e the event
   * @memberof WeatherApplication
   */
  async search (e) {
    if (e.key === 'Enter' && this.shadowRoot.getElementById('search').value.trim() !== '') {
      const latlon = await this.getCurrentWeather(this.shadowRoot.getElementById('search').value.trim(), 'SE')
      this.getWeatherForecast(latlon.lat, latlon.lon)

      this._lastSearch = this.shadowRoot.getElementById('search').value.trim()
      window.localStorage.setItem('weathercity', this.shadowRoot.getElementById('search').value.trim())
    }
  }

  /**
   * Show current weather
   *
   * @param {Event} e the event
   * @memberof WeatherApplication
   */
  showCurrentWeather (e) {
    this.shadowRoot.getElementById('currentButton').classList.add('active')
    this.shadowRoot.getElementById('forecastButton').classList.remove('active')
    this.shadowRoot.querySelector('.weatherInfo').style.display = 'flex'
    this.shadowRoot.querySelector('.weatherForecast').style.display = 'none'
  }

  /**
   * Show weather forecast
   *
   * @param {Event} e the event
   * @memberof WeatherApplication
   */
  showForecastWeather (e) {
    this.shadowRoot.getElementById('currentButton').classList.remove('active')
    this.shadowRoot.getElementById('forecastButton').classList.add('active')
    this.shadowRoot.querySelector('.weatherInfo').style.display = 'none'
    this.shadowRoot.querySelector('.weatherForecast').style.display = 'flex'
  }

  /**
   * Get date string
   *
   * @param {int} weekday the day number
   * @param {int} date the date
   * @param {int} month the month number
   * @returns {String} the formatted date string
   * @memberof WeatherApplication
   */
  getFormattedDate (weekday, date, month) {
    const formattedDate = this.getDayString(weekday) + ' ' + date + ' ' + this.getMonthString(month)

    return formattedDate
  }

  /**
   * Get the day string from day number
   *
   * @param {int} dayNbr the day number
   * @returns {String} the day string
   * @memberof WeatherApplication
   */
  getDayString (dayNbr) {
    let dayString = ''
    switch (dayNbr) {
      case 1:
        dayString = 'Mon'
        break
      case 2:
        dayString = 'Tue'
        break
      case 3:
        dayString = 'Wed'
        break
      case 4:
        dayString = 'Thu'
        break
      case 5:
        dayString = 'Fri'
        break
      case 6:
        dayString = 'Sat'
        break
      case 0:
        dayString = 'Sun'
        break
    }
    return dayString
  }

  /**
   * Get month string from month number
   *
   * @param {int} monthNbr the month number
   * @returns {String} the month string
   * @memberof WeatherApplication
   */
  getMonthString (monthNbr) {
    let monthString = ''
    switch (monthNbr) {
      case 0:
        monthString = 'Jan'
        break
      case 1:
        monthString = 'Feb'
        break
      case 2:
        monthString = 'Mar'
        break
      case 3:
        monthString = 'Apr'
        break
      case 4:
        monthString = 'May'
        break
      case 5:
        monthString = 'Jun'
        break
      case 6:
        monthString = 'Jul'
        break
      case 7:
        monthString = 'Aug'
        break
      case 8:
        monthString = 'Sep'
        break
      case 9:
        monthString = 'Oct'
        break
      case 10:
        monthString = 'Nov'
        break
      case 11:
        monthString = 'Dec'
        break
    }
    return monthString
  }
}

window.customElements.define('weather-application', WeatherApplication)
