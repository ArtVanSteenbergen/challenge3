function nth(d) {
  if (d > 3 && d < 21)
    return d+'th'; 
  switch (d % 10) {
    case 1:  return d+"st";
    case 2:  return d+"nd";
    case 3:  return d+"rd";
    default: return d+"th";
  }
}

function returnIconUrl(weatherType) {
  switch(weatherType) {
    case '01d':
      return baseWeatherUrl + 'day_clear.png';
    case '01n':
      return baseWeatherUrl + 'night_full_moon_clear.png';
    case '02d':
      return baseWeatherUrl + 'day_partial_cloud.png';
    case '02n':
      return baseWeatherUrl + 'night_full_moon_partial_cloud.png';
    case '03d':
      return baseWeatherUrl + 'cloudy.png';
    case '03n':
      return baseWeatherUrl + 'cloudy.png';
    case '04d':
      return baseWeatherUrl + 'angry_clouds.png';
    case '04n':
      return baseWeatherUrl + 'angry_clouds.png';
    case '09d':
      return baseWeatherUrl + 'rain.png';
    case '09n':
      return baseWeatherUrl + 'rain.png';
    case '10d':
      return baseWeatherUrl + 'day_rain.png';
    case '10n':
      return baseWeatherUrl + 'night_full_moon_rain.png';
    case '11d':
      return baseWeatherUrl + 'thunder.png';
    case '11n':
      return baseWeatherUrl + 'thunder.png';
    case '13d':
      return baseWeatherUrl + 'day_snow.png';
    case '13n':
      return baseWeatherUrl + 'night_full_moon_snow.png';
    case '50d':
      return baseWeatherUrl + 'fog.png';
    case '50n':
      return baseWeatherUrl + 'fog.png';
    default:
      return baseWeatherUrl + 'day_clear.png';
  }
}

function bestLocation() {
  if (locationOne.wind.speed <= locationTwo.wind.speed && locationOne.wind.speed <= locationThree.wind.speed) {
    return locationOne;
  }
  if (locationTwo.wind.speed <= locationOne.wind.speed && locationTwo.wind.speed <= locationThree.wind.speed) {
    return locationTwo;
  }
  if (locationThree.wind.speed <= locationOne.wind.speed && locationThree.wind.speed <= locationTwo.wind.speed) {
    return locationThree;
  }
}

function goForLanding(location) {
  if (location.wind.speed<5 && location.main.temp > 5) return true;
}

function vibrate(duration) {
  window.navigator.vibrate(duration);
}

function updateAPIdata() {
  fetch(requestLocationOne)
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    showLocation(locationOne, '#locationOne', 'locationOne', 1);
  }).then(function() {
    return fetch(requestLocationTwo);
  }).then((response) => {
    return response.json();
  })
  .then((response) => {
    showLocation(locationTwo, '#locationTwo', 'locationTwo', 2);
  }).then(function() {
    return fetch(requestLocationThree)
  })
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    showLocation(locationThree, '#locationThree', 'locationThree', 3);
  });
}