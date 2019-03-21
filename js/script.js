// all the constants
const
HTML = $('html'),
DATEONSCREEN = $('#date'),
TIMEONSCREEN = $('#time'),
DAYSOFWEEK = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
MONTHSOFYEAR = ['January','February','March','April','May','June','July','August','September','October','November','December'];

// all the variables
var
locations = ['Cape Canaveral', 'Brownsville', 'Los Angeles'],
// locations = ['The Hague', 'Limburg', 'Groningen'],
// locations = ['London', 'New Jersey', 'Washington'],
// locations = ['Alaska','Hawai', 'Ohio'],

locationOne = [],
locationTwo = [],
locationThree = [],

tl = new TimelineMax(),
locationOneTL = new TimelineMax(),
locationTwoTL = new TimelineMax(),
locationTwoTL.add('locationTwo', '+=1'),
locationThreeTL = new TimelineMax(),
locationThreeTL.add('locationThree', '+=1.5'),

datetime = new Date(),
h = datetime.getHours(),
i = datetime.getMinutes(),
s = datetime.getSeconds(),
n = DAYSOFWEEK[datetime.getDay()],
d = datetime.getDate(),
m = MONTHSOFYEAR[datetime.getMonth()],
Y = datetime.getFullYear(),

requestLocationOne = 'https://api.openweathermap.org/data/2.5/weather?appid=b0c8dafa512a0134e90df6ece3c2b7a2&q=' + encodeURI(locations[0]) + '&units=metric',
requestLocationTwo = 'https://api.openweathermap.org/data/2.5/weather?appid=b0c8dafa512a0134e90df6ece3c2b7a2&q=' + encodeURI(locations[1]) + '&units=metric',
requestLocationThree = 'https://api.openweathermap.org/data/2.5/weather?appid=b0c8dafa512a0134e90df6ece3c2b7a2&q=' + encodeURI(locations[2]) + '&units=metric',

locationOneWindmill = TweenMax.to('#locationOne .windmill', 1, {rotation: '360', ease: Linear.easeNone, repeat: -1, paused: true}),
locationTwoWindmill = TweenMax.to('#locationTwo .windmill', 1, {rotation: '360', ease: Linear.easeNone, repeat: -1, paused: true}),
locationThreeWindmill = TweenMax.to('#locationThree .windmill', 1, {rotation: '360', ease: Linear.easeNone, repeat: -1, paused: true}),

requestRick = 'https://rickandmortyapi.com/api/character/1',
requestMorty = 'https://rickandmortyapi.com/api/character/2',

locationOneDirectionTween = TweenMax.to('#locationOne .windDirection', 1, {rotation: '360', ease: Linear.easeNone, repeat: -1, paused: true}),
locationTwoDirectionTween = TweenMax.to('#locationTwo .windDirection', 1, {rotation: '360', ease: Linear.easeNone, repeat: -1, paused: true}),
locationThreeDirectionTween = TweenMax.to('#locationThree .windDirection', 1, {rotation: '360', ease: Linear.easeNone, repeat: -1, paused: true}),

baseWeatherUrl = 'img/weather-icons/';


function showDate(date) {
  if (DATEONSCREEN.html() != '') {
    TweenMax.from(DATEONSCREEN, 3, {y: '-50%', autoAlpha: 0, ease: Elastic.easeOut});
  }
  DATEONSCREEN.html(date);
}

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

function goForLanding(location) {
  if (location.wind.speed<5 && location.main.temp > 5) return true;
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


function showLocationOne(response) {
  locationOne = response;

  $('#locationOne .weatherIcon').attr({'src': returnIconUrl(locationOne.weather[0].icon), 'alt': locationOne.weather[0].description, 'title': locationOne.weather[0].description});
  
  locationOneTL.to(locationOneDirectionTween, 1, {progress: locationOne.wind.deg / 360}, 'locationOne')
  .to(locationOneWindmill, (15 / locationOne.wind.speed), {progress: 1, ease: Linear.easeNone, repeat: -1}, 'locationOne')
  .to('#locationOne .windSpeed', 1, {text: {value: Math.round(locationOne.wind.speed * 3.6)+'km/h'}}, 'locationOne')
  .to('#locationOne .cityName', 1, {text: {value: locationOne.name}}, 'locationOne')
  .fromTo('#locationOne .temp',1, {text: {value: locationOne.main.temp + '°C'}, autoAlpha: 0},{text: {value: locationOne.main.temp + '°C'}, autoAlpha:1}, 'locationOne+=0.5')
  .fromTo('header', 3, {y: '-50%', autoAlpha: 0},{y: '0%', autoAlpha: 1, ease: Elastic.easeOut});
  
  if(!goForLanding(locationOne)){
    TweenMax.set('#locationOne',{color: 'rgba(255,255,255,0.3)',filter: 'grayscale(100%)'});
  } else {
    TweenMax.set('#locationOne',{color: 'rgba(255,255,255,1)',filter: 'grayscale(0%)'});
  }
}

function showLocationTwo(response) {
  locationTwo = response;

  $('#locationTwo .weatherIcon').attr({'src': returnIconUrl(locationTwo.weather[0].icon), 'alt': locationTwo.weather[0].description, 'title': locationTwo.weather[0].description}, 'locationTwo')
  
  locationTwoTL.to(locationTwoDirectionTween, 1, {progress: locationTwo.wind.deg / 360}, 'locationTwo')
  .to(locationTwoWindmill, (15 / locationTwo.wind.speed), {progress: 1, ease: Linear.easeNone, repeat: -1}, 'locationTwo')
  .to('#locationTwo .windSpeed', 1, {text: {value: Math.round(locationTwo.wind.speed * 3.6) + 'km/h'}}, 'locationTwo')
  .to('#locationTwo .cityName', 1, {text: {value: locationTwo.name}}, 'locationTwo')
  .fromTo('#locationTwo .temp',1, {text: {value: locationTwo.main.temp + '°C'}, autoAlpha: 0},{text: {value: locationTwo.main.temp + '°C'}, autoAlpha:1}, 'locationTwo+=0.5');
  
  if(!goForLanding(locationTwo)){
    TweenMax.set('#locationTwo',{color: 'rgba(255,255,255,0.3)',filter: 'grayscale(100%)'});
  } else {
    TweenMax.set('#locationTwo',{color: 'rgba(255,255,255,1)',filter: 'grayscale(0%)'});
  }
}

function showLocationThree(response) {
  locationThree = response;

  $('#locationThree .weatherIcon').attr({'src': returnIconUrl(locationThree.weather[0].icon), 'alt': locationThree.weather[0].description, 'title': locationThree.weather[0].description}, 'locationThree')
  locationThreeTL.to(locationThreeDirectionTween, 1, {progress: locationThree.wind.deg / 360}, 'locationThree')
  .to(locationThreeWindmill, (15 / locationThree.wind.speed), {progress: 1, ease: Linear.easeNone, repeat: -1}, 'locationThree') 
  .to('#locationThree .windSpeed', 1, {text: {value: Math.round(locationThree.wind.speed * 3.6) + 'km/h'}}, 'locationThree')
  .to('#locationThree .cityName', 1, {text: {value: locationThree.name}}, 'locationThree')
  .fromTo('#locationThree .temp',1, {text: {value: locationThree.main.temp + '°C'}, autoAlpha: 0},{text: {value: locationThree.main.temp + '°C'}, autoAlpha:1}, 'locationThree+=0.5')
  .staggerFrom('article', 2, {y: '-50px', autoAlpha: 0, ease:Back.easeOut}, 0.5, 'locationOne-=3');
  
  if(!goForLanding(locationThree)){
    TweenMax.set('#locationThree',{color: 'rgba(255,255,255,0.3)',filter: 'grayscale(100%)'});
  } else {
    TweenMax.set('#locationThree',{color: 'rgba(255,255,255,1)',filter: 'grayscale(0%)'});
  }
}


function showRickAndMorty(response) {

    tl.from('footer #rick',1,{x: '-100%', autoAlpha: 0, ease: Power4.easeOut})
    .fromTo('footer #rick .text',1,{y: '50%', autoAlpha: 0},{text: {value: 'Hey, Morty!'},y:'0%', autoAlpha: 0.75})

    .from('footer #morty',1,{x:'100%', autoAlpha: 0, ease: Power4.easeOut})
    .to('footer #rick .text', 1, {text: {value: ''}, autoAlpha: 0}, '+=1')

    .fromTo('footer #morty .text',1,{y: '50%', autoAlpha: 0},{text: {value: 'Yes, Rick?'},y:'0%', autoAlpha: 0.75}, '-=3')
    .to('footer #morty .text', 1, {text: {value: ''}, autoAlpha: 0})

    .to('footer #rick .text',3,{text: {value: 'It looks like we\'re going to land in, *burb*, ' + bestLocation().name + ' Morty.'}, autoAlpha: 0.75}, '-=1')
    .to('footer #rick .text', 1, {text: {value: ''}, autoAlpha: 0}, '+=2')

    .to('footer #morty .text',2,{text: {value: 'Okay, but.. but.. but why Rick?'}, autoAlpha: 0.75}, '-=1')
    .to('footer #morty .text', 1, {text: {value: ''}, autoAlpha: 0}, '+=2')

    .to('footer #rick .text',3,{text: {value: 'Because it has the lowest wind speed Morty and it has ' + bestLocation().weather[0].description + '.'}, autoAlpha: 0.75}, '-=1')
    .to('footer #rick .text', 1, {text: {value: ''}, autoAlpha: 0}, '+=2')

    .to('footer #morty .text',2,{text: {value: 'Let\'s go to '+ bestLocation().name + ' then.'}, autoAlpha: 0.75}, '-=1')
    .to('footer #morty .text', 1, {text: {value: ''}, autoAlpha: 0}, '+=2')

    .to('footer #rick', 1, {x: '-100%', autoAlpha: 0}, '-=1')

    .to('footer #morty', 1, {x:'100%', autoAlpha: 0}, '-=0.5')

    .from('#restartBtn',2,{y:'-700%', autoAlpha: 0, ease: Bounce.easeOut}, '-=1');
}

function showDigitalClock(h,i,s) {
  h = (h < 10) ? '0' + h : h;
  i = (i < 10) ? '0' + i : i;
  s = (s < 10) ? '0' + s : s;
  his = h + ':' + i + ':' + s;
  
  TweenMax.set(TIMEONSCREEN,{text:{value: his}});
}

function showTime() {
  datetime =  new Date();

  h = datetime.getHours();
  i = datetime.getMinutes();
  s = datetime.getSeconds();
  n = DAYSOFWEEK[datetime.getDay()];
  d = datetime.getDate();
  m = MONTHSOFYEAR[datetime.getMonth()];
  Y = datetime.getFullYear();

  date = n + ', ' + m + ' ' +  nth(d) + ' ' + Y;
  if (DATEONSCREEN.html() != date) {showDate(date);}

  showDigitalClock(h,i,s);
}

function getAPIdata() {
  fetch(requestLocationOne)
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    showLocationOne(response);
  }).then(function() {
    return fetch(requestLocationTwo);
  }).then((response) => {
    return response.json();
  })
  .then((response) => {
    showLocationTwo(response);
  }).then(function() {
    return fetch(requestLocationThree)
  })
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    showLocationThree(response);
  }).then(() => {
    return fetch(requestRick)
  }).then((response) => {
    return response.json();
  })
  .then((response) => {
    $('footer #rick .avatar').attr({'src':response.image, 'alt':response.name,'title':response.name});
    return fetch(requestMorty)
  }).then((response) => {
    return response.json();
  })
  .then((response) => {
    $('footer #morty .avatar').attr({'src':response.image, 'alt':response.name,'title':response.name});
    showRickAndMorty(response);
  });
}

function updateAPIdata() {
  fetch(requestLocationOne)
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    showLocationOne(response);
  }).then(function() {
    return fetch(requestLocationTwo);
  }).then((response) => {
    return response.json();
  })
  .then((response) => {
    showLocationTwo(response);
  }).then(function() {
    return fetch(requestLocationThree)
  })
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    showLocationThree(response);
  });
}

getAPIdata();

showTime();

setInterval(function() {
  showTime();
}, 1000);

setInterval(function() {
  updateAPIdata();
}, 300000);

function vibrate(duration) {
  window.navigator.vibrate(duration);
}

$('#restartBtn').click(()=>{tl.restart();vibrate(200);});