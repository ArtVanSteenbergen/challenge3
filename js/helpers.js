/**
	@param d is the day of the month
	@returns d with a propper suffix
*/
function nth(d) {
  if (d > 3 && d < 21)
    return d+'th'; 
  switch (d % 10) {
    case 1:  return `${d}st`;
    case 2:  return `${d}nd`;
    case 3:  return `${d}rd`;
    default: return `${d}th`;
  }
}

/**
	@param weatherType is code for a type of weather form the Open Weather Map API
	@returns the URL of the corresponding image
*/
function returnIconUrl(weatherType) {
  //return 'https://airvisual.com/images/'+weatherType+'.png';
  switch(weatherType) {
    case '01d': return `${baseWeatherUrl}day_clear.png`;
    case '01n': return `${baseWeatherUrl}night_full_moon_clear.png`;
    case '02d': return `${baseWeatherUrl}day_partial_cloud.png`;
    case '02n': return `${baseWeatherUrl}night_full_moon_partial_cloud.png`;
    case '03d': return `${baseWeatherUrl}cloudy.png`;
    case '03n': return `${baseWeatherUrl}cloudy.png`;
    case '04d': return `${baseWeatherUrl}angry_clouds.png`;
    case '04n': return `${baseWeatherUrl}angry_clouds.png`;
    case '09d': return `${baseWeatherUrl}rain.png`;
    case '09n': return `${baseWeatherUrl}rain.png`;
    case '10d': return `${baseWeatherUrl}day_rain.png`;
    case '10n': return `${baseWeatherUrl}night_full_moon_rain.png`;
    case '11d': return `${baseWeatherUrl}thunder.png`;
    case '11n': return `${baseWeatherUrl}thunder.png`;
    case '13d': return `${baseWeatherUrl}day_snow.png`;
    case '13n': return `${baseWeatherUrl}night_full_moon_snow.png`;
    case '50d': return `${baseWeatherUrl}fog.png`;
    case '50n': return `${baseWeatherUrl}fog.png`;
    default   : return `${baseWeatherUrl}day_clear.png`;
  }
}

/**
	@returns the location object with the lowest wind speed
*/
function lowestWindSpeed() {
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

/**
	@param location is a Open Weather Map API Object
	@returns true if wind speed op location object is under threshold
*/
function goForLanding(location) {
  if (location.wind.speed < MAXWINDSPEED) return true;
}


/**
	@param duration is time in miliseconds
*/
function vibrate(duration) {
  window.navigator.vibrate(duration);
}

/**
  update weather data with new information an log timestamp in the console
*/
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
  console.log(`%cLast updated: ${new Date}`, 'font-weight: bold; font-family: sans-serif; font-size: 16px; color: #004F84;');
}