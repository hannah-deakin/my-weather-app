//Plus Week 4 Homework - HTML/SS To JS
//⏰Feature #1
//In your project, display the current date and time using JavaScript: Tuesday 16:00
let currentTime = new Date();

function displayCurrentDate(time) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let currentDay = days[time.getDay()];

  let currentDate = time.getDate();

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let currentMonth = months[time.getMonth()];

  let currentYear = time.getFullYear();

  let currentHours = time.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  currentHours = currentHours.toLocaleString("en-GB");

  let currentMinutes = time.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  currentMinutes = currentMinutes.toLocaleString("en-GB");

  let dateAndTime = document.querySelector("#date-and-time");
  dateAndTime.innerHTML = `${currentDay} ${currentDate} ${currentMonth} ${currentYear}, ${currentHours}:${currentMinutes}`;
}
displayCurrentDate(currentTime);

// 🙀Bonus Feature
// Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.
// Code it inside VS Code or Sandbox. Move your code into a CodeSandbox and submit the URL of the working version.
//function convertToFahrenheit(event) {
//  event.preventDefault();
//  let temperatureElement = document.querySelector("#temperature");
//  let temperature = temperatureElement.innerHTML;
//  temperature = Number(temperature);
//  temperatureElement.innerHTML = 66;
//}

//function convertToCelsius(event) {
//  event.preventDefault();
//  let temperatureElement = document.querySelector("#temperature");
//  temperatureElement.innerHTML = 19;
//}

//let fahrenheitLink = document.querySelector("#fahrenheit-link");
//fahrenheitLink.addEventListener("click", convertToFahrenheit);

//let celsiusLink = document.querySelector("#celsius-link");
//celsiusLink.addEventListener("click", convertToCelsius);

//Plus Week 5 Homework - Search Engine
//👨‍🏫Your task
//On your project, when a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.
function showCurrentTemp(response) {
  console.log(response);
  document.querySelector("#chosen-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#currently").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function search(city) {
  let apiKey = "315a9bcbf521af440df195ee85aa6e09";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric
`;
  axios.get(apiUrl).then(showCurrentTemp);
}

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

let searchCity = document.querySelector("#search-city-form");
searchCity.addEventListener("submit", submitCity);

search("New York");

//🙀 Bonus point:
//Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.
function getWeather(response) {
  let city = document.querySelector("#chosen-city");
  city.innerHTML = response.data.name;

  let temp = document.querySelector("#temperature");
  temp.innerHTML = Math.round(response.data.main.temp);
}

function findPosition(position) {
  console.log(position);
  let apiKey = "315a9bcbf521af440df195ee85aa6e09";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(getWeather);
}

function clickButton(event) {
  navigator.geolocation.getCurrentPosition(findPosition);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", clickButton);
