//declare global variables
const searchFormEl = document.querySelector('#city-search')
const searchButton = document.querySelector('.submit-btn')
const newSearchBtnEl = document.querySelector('.clear-btn')

// current conditions data variables
const tempEl = document.querySelector('#temp')
const windEl = document.querySelector('#wind')
const humidityEl = document.querySelector('#humidity')
const uviIndexEl = document.querySelector('#uv-index')
const cityNameEl = document.querySelector('#city-name')
const iconEl = document.querySelector('#icon')
var cityButtonEl = document.querySelector('.city-button')
var searchContainer = document.querySelector('.card-body')

// five day forecast data variables
const fiveDayContainer = document.querySelector('.fiveday-container')
const weatherCard = document.querySelector('.weather-card')

// dates vatiables
const dateEl = document.querySelector('#date')
var today = moment().format('l')

// api key
var apiKey = "a79cc559d0824f46711db4a217d374a2"

// event listeners for buttons
searchButton.addEventListener("click", submitHandler)
newSearchBtnEl.addEventListener("click", () => {
  location.assign('index.html') 
  localStorage.clear()
})


// function for handling click searches
function submitHandler(event) {
  event.preventDefault()
  fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + searchFormEl.value + '&appid=' + apiKey)
    .then((response) => response.json())
    .then((data) => {
      const name = data[0].name;
      const lat = data[0].lat;
      const lon = data[0].lon;

      //new search button apprears at bottom of page
      newSearchBtnEl.classList.remove('hide')

      // getting past searches only for cities that were searched
      var searchedCity = JSON.parse(localStorage.getItem('searchedCity')) || []
      var found = false
      for (let index = 0; index < searchedCity.length; index++) {
        if (searchedCity[index][0] == searchFormEl.value) {
          found = true
        }
      }

      if (!found) {
        searchedCity.push([name, lat, lon])
        localStorage.setItem('searchedCity', JSON.stringify(searchedCity))

      retrieveLocalStorage()
      }

      // call for five day weather data
      fiveDayWeather(lat, lon, name)
    })
}

// function for calling lat/long and pairing them with names of different cities, and presenting data
function fiveDayWeather(lat, lon, name) {
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hour&units=imperial&appid=a79cc559d0824f46711db4a217d374a2`)
    .then((response) => response.json())
    .then((data) => {

      // current weater data
      const temp = data.current.temp
      const humidity = data.current.humidity
      const windSpeed = data.current.wind_speed
      const uvi = data.current.uvi
      const icon = data.current.weather[0].icon
      const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`

      tempEl.textContent = `Current temperature: ${temp}°F`
      windEl.textContent = `Wind Speed: ${windSpeed} MPH`
      humidityEl.textContent = `Humidity: ${humidity}%`
      cityNameEl.textContent = `(${today}) ${name}`
      iconEl.setAttribute('src', iconURL)

      // code for changing UVI background colors
    uviIndexEl.textContent = `UVI: ${uvi}`
    //    let currentUvi = parseInt(data.curent.uvi)
       

      //5 day forecast variables for data DOM
      let day1 = data.daily[1]
      let day2 = data.daily[2]
      let day3 = data.daily[3]
      let day4 = data.daily[4]
      let day5 = data.daily[5]

      // array for all 5 days
      let futureDays = [day1, day2, day3, day4, day5]
      fiveDayContainer.innerHTML = ""

      // loop for all weather data for each card
      for (let index = 0; index < futureDays.length; index++) {

        //create card containters within loop to go inside larger 5 day container hard-coded into HTML
        const cardContainers = document.createElement('div')
        cardContainers.classList.add('weather-card')
        fiveDayContainer.append(cardContainers)

        // create element for date within cards
        const futureDates = moment(futureDays[index].dt * 1000).format('dddd, MMM Do')
        cardContainers.append(futureDates)

        // create element for icons for 5 day cards
        let fiveDaysIcon = futureDays[index].weather[0].icon
        const iconImgs = document.createElement('img')
        iconImgs.src = `https://openweathermap.org/img/wn/${fiveDaysIcon}@2x.png`
        cardContainers.append(iconImgs)

        // create text elements for specific items inside of cards
        let fiveDayTemp = futureDays[index].temp.day
        let tempText = document.createElement('h4')
        tempText.textContent = `Temp: ${fiveDayTemp}°F`
        const textBox = document.createElement('div')
        textBox.classList.add('text-box')
        cardContainers.append(textBox)
        textBox.append(tempText)

        let fiveDayWind = futureDays[index].wind_speed
        let windText = document.createElement('h4')
        windText.textContent = `Wind: ${fiveDayWind} MPH`
        textBox.append(windText)

        let fiveDayHumidity = futureDays[index].humidity
        let humidityText = document.createElement('h4')
        humidityText.textContent = `Humidity: ${fiveDayHumidity}%`
        textBox.append(humidityText)
      }
    })
}
// creating searched city buttons and linking past searches to them
function retrieveLocalStorage() {
  var searchedCity = JSON.parse(localStorage.getItem('searchedCity')) || []
  searchContainer.innerHTML = ''
  for (let index = 0; index < searchedCity.length; index++) {
    var cityButton = document.createElement("button");
    cityButton.textContent = searchedCity[index][0]
    cityButton.classList.add('btn')
    cityButton.setAttribute('data-lat', searchedCity[index][1])
    cityButton.setAttribute('data-lon', searchedCity[index][2])
    cityButton.addEventListener('click', cityButtons)
    searchContainer.append(cityButton)

  }
}

// function for retrieving forecast through city buttons
function cityButtons(event) {
  let searchedName = event.target.textContent
  let searchedLat = event.target.getAttribute('data-lat')
  let searchedLon = event.target.getAttribute('data-lon')
  fiveDayWeather(searchedLat, searchedLon, searchedName)
}

retrieveLocalStorage()