let now = new Date();

let todayDate = document.querySelector(".data");

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];

todayDate.innerHTML = `${day} ${hours}:${minutes}`;

//change city and Temperature

function getWeather(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityWeather = document.querySelector("#searched-city");
  cityElement.innerHTML = `${cityWeather.value}`;
  let apiKey = "72d556c5d66fd87c54e6c5be3fb12812";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityWeather.value}&appid=${apiKey}&units=${unit}`;

  function showTemperature(response) {
    let temperature = Math.round(response.data.main.temp);
    let curTemp = document.querySelector("#temperature");
    curTemp.innerHTML = temperature;
  }
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", getWeather);

let currentButton = document.querySelector("#currentbutton");
currentButton.addEventListener("click", showCurrenLocation);

function showCurrenLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function retrievePosition(position) {
  let apiKey = "72d556c5d66fd87c54e6c5be3fb12812";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  let enterCity = response.data.name;
  let currentCityElement = document.querySelector("#searched-city");
  currentCityElement.innerHTML = enterCity;

  let temperatureCelsius = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = temperatureCelsius;
}
