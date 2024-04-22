document.getElementById("searchButton").addEventListener("click", function() {
  var location = document.getElementById("searchInput").value;
  getWeather(location);
});

function getWeather(location) {
  var apiKey = "c0d573b18729da9019711dcbacf8458d"; // Replace with your API key
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      alert("Error fetching weather data. Please try again later.");
      console.error('There was a problem with the fetch operation:', error);
    });
}

function displayWeather(data) {
  var weatherInfo = document.getElementById("weatherInfo");
  var iconCode = data.weather[0].icon; // Get the icon code from the API response
  var iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`; // Construct the icon URL

  weatherInfo.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <img src="${iconUrl}" alt="Weather Icon"> <!-- Display the weather icon -->
    <p>${data.weather[0].description}</p>
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Humidity: ${data.main.humidity}%</p>
  `;

  var weatherBackground = document.querySelector('body');
  if (data.weather[0].main === "Clear") {
    weatherBackground.style.backgroundImage = "url('day-clear.jpg')";
  } else if (data.weather[0].main === "Clouds") {
    weatherBackground.style.backgroundImage = "url('cloudy.jpg')";
  } else if (data.weather[0].main === "Rain") {
    weatherBackground.style.backgroundImage = "url('rainy.jpg')";
  } else {
    weatherBackground.style.backgroundImage = "url('default.jpg')";
  }
}

// Add event listener to detect scroll and hide footer
window.addEventListener('scroll', function() {
  var footer = document.querySelector('.footer');
  if (window.scrollY > 100) {
    footer.classList.add('hide');
  } else {
    footer.classList.remove('hide');
  }
});
