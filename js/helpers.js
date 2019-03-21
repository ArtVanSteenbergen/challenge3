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
  if (locations[0].wind.speed <= locations[1].wind.speed && locations[0].wind.speed <= locations[2].wind.speed) {
    return locations[0];
  }
  if (locations[1].wind.speed <= locations[0].wind.speed && locations[1].wind.speed <= locations[2].wind.speed) {
    return locations[1];
  }
  if (locations[2].wind.speed <= locations[0].wind.speed && locations[2].wind.speed <= locations[1].wind.speed) {
    return locations[2];
  }
}

function goForLanding(location) {
  if (location.wind.speed < (25/3.6) && location.main.temp > (25/3.6)) return true;
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
    locations[0] = response;
    showLocation(locations[0], '#locationOne', 'locationOne', 2);
  }).then(function() {
    return fetch(requestLocationTwo);
  }).then((response) => {
    return response.json();
  })
  .then((response) => {
    locations[1] = response;
    showLocation(locations[1], '#locationTwo', 'locationTwo', 2);
  }).then(function() {
    return fetch(requestLocationThree);
  })
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    locations[2] = response;
    showLocation(locations[2], '#locationThree', 'locationThree', 2);
  });
}