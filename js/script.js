$(document).ready(function() {
  // all the constants
  const
  HTML = $('html'),
  DATEONSCREEN = $('#date'),
  TIMEONSCREEN = $('#time'),
  DAYSOFWEEK = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
  MONTHSOFYEAR = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  
  // all the variables
  var
  capeCanaveral = [],
  bocaChica = [],
  losAngeles = [],

  tl = new TimelineMax(),

  datetime = new Date(),
  h = datetime.getHours(),
  i = datetime.getMinutes(),
  s = datetime.getSeconds(),
  n = DAYSOFWEEK[datetime.getDay()],
  d = datetime.getDate(),
  m = MONTHSOFYEAR[datetime.getMonth()],
  Y = datetime.getFullYear(),

  requestCapeCanaveral = 'https://api.openweathermap.org/data/2.5/weather?appid=b0c8dafa512a0134e90df6ece3c2b7a2&q=cape%20canaveral&units=metric',
  // requestCapeCanaveral = 'https://api.openweathermap.org/data/2.5/weather?appid=b0c8dafa512a0134e90df6ece3c2b7a2&q=&units=metric',
  requestBocaChica = 'https://api.openweathermap.org/data/2.5/weather?appid=b0c8dafa512a0134e90df6ece3c2b7a2&q=boca%20chica&units=metric',
  requestPortOfLosAngeles = 'https://api.openweathermap.org/data/2.5/weather?appid=b0c8dafa512a0134e90df6ece3c2b7a2&q=los%20angeles&units=metric',

  capeCanaveralWindmill = TweenMax.to('#capeCanaveral .windmill', 1, {rotation: '360', ease: Linear.easeNone, repeat: -1, paused: true}),
  bocaChicaWindmill = TweenMax.to('#bocaChica .windmill', 1, {rotation: '360', ease: Linear.easeNone, repeat: -1, paused: true}),
  losAngelesWindmill = TweenMax.to('#losAngeles .windmill', 1, {rotation: '360', ease: Linear.easeNone, repeat: -1, paused: true}),

  // rickAndMorty = 'https://rickandmortyapi.com/api/character/',
  
  capeCanaveralDirectionTween = TweenMax.to('#capeCanaveral .windDirection', 1, {rotation: '360', ease: Linear.easeNone, repeat: -1, paused: true}),
  bocaChicaDirectionTween = TweenMax.to('#bocaChica .windDirection', 1, {rotation: '360', ease: Linear.easeNone, repeat: -1, paused: true}),
  losAngelesDirectionTween = TweenMax.to('#losAngeles .windDirection', 1, {rotation: '360', ease: Linear.easeNone, repeat: -1, paused: true}),

  init = new TimelineMax();

  function showDate(date) {
    if (DATEONSCREEN.html() != '') {TweenMax.from(DATEONSCREEN, 3, {y: '-50%', autoAlpha: 0, ease: Elastic.easeOut});}
    DATEONSCREEN.html(date);
  }
TweenMax.from('header', 3, {y: '-50%', autoAlpha: 0, ease: Elastic.easeOut});
  // return st, nd, rd or th to day of month
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
        return 'https://www.metaweather.com/static/img/weather/png/64/c.png';
      case '01n':
        return 'https://www.metaweather.com/static/img/weather/png/64/c.png';
      case '02d':
        return 'https://www.metaweather.com/static/img/weather/png/64/lc.png';
      case '02n':
        return 'https://www.metaweather.com/static/img/weather/png/64/lc.png';
      case '03d':
        return 'https://www.metaweather.com/static/img/weather/png/64/hc.png';
      case '03n':
        return 'https://www.metaweather.com/static/img/weather/png/64/hc.png';
      case '04d':
        return 'https://www.metaweather.com/static/img/weather/png/64/hc.png';
      case '04n':
        return 'https://www.metaweather.com/static/img/weather/png/64/hc.png';
      case '09d':
        return 'https://www.metaweather.com/static/img/weather/png/64/s.png';
      case '09n':
        return 'https://www.metaweather.com/static/img/weather/png/64/s.png';
      case '10d':
        return 'https://www.metaweather.com/static/img/weather/png/64/lr.png';
      case '10n':
        return 'https://www.metaweather.com/static/img/weather/png/64/lr.png';
      case '11d':
        return 'https://www.metaweather.com/static/img/weather/png/64/t.png';
      case '11n':
        return 'https://www.metaweather.com/static/img/weather/png/64/t.png';
      case '13d':
        return 'https://www.metaweather.com/static/img/weather/png/64/sn.png';
      case '13n':
        return 'https://www.metaweather.com/static/img/weather/png/64/sn.png';
      default:
        return 'https://www.metaweather.com/static/img/weather/png/64/c.png';
    }
  }

  function goForLanding(location) {
    if (location.wind.speed<5 && location.main.temp > 5) return true;
  }

  function getAPIdata() {
  // construct request


  // fetch(rickAndMorty+Math.floor(Math.random() * 20) + 1)
  // .then(function(response) {
  //   return response.json();
  // })
  // .then(function(response) {
  //   $('main').append('<img src="'+ response.image + '" alt="'+response.name+'"/>');
  // });

  // get current weather
  fetch(requestCapeCanaveral)
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    capeCanaveral = response;
    $('#capeCanaveral .weatherIcon').attr({'src': returnIconUrl(capeCanaveral.weather[0].icon), 'alt': capeCanaveral.weather[0].description, 'title': capeCanaveral.weather[0].description});
    TweenMax.to(capeCanaveralDirectionTween, 1, {progress: capeCanaveral.wind.deg/360});
    TweenMax.to(capeCanaveralWindmill, (15/capeCanaveral.wind.speed), {progress: 1, ease: Linear.easeNone, repeat: -1}); 
    TweenMax.to('#capeCanaveral .windSpeed', 1, {text: {value: Math.round(capeCanaveral.wind.speed*3.6)+'km/h'}});
    TweenMax.to('#capeCanaveral .cityName', 1, {text: {value: capeCanaveral.name}});
    TweenMax.fromTo('#capeCanaveral .temp',1, {text: {value: capeCanaveral.main.temp + '°C'}, autoAlpha: 0},{text: {value: capeCanaveral.main.temp + '°C'},autoAlpha:1, delay: 0.5});
  }).then(function() {
    if(goForLanding(capeCanaveral)){
    }
  });

  fetch(requestBocaChica)
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    bocaChica = response;
    $('#bocaChica .weatherIcon').attr({'src': returnIconUrl(bocaChica.weather[0].icon), 'alt': bocaChica.weather[0].description, 'title': bocaChica.weather[0].description});
    TweenMax.to(bocaChicaDirectionTween, 1, {progress: bocaChica.wind.deg/360, delay: 0.5});
    TweenMax.to(bocaChicaWindmill, (15/bocaChica.wind.speed), {progress: 1, ease: Linear.easeNone, repeat: -1}); 
    TweenMax.to('#bocaChica .windSpeed', 1, {text: {value: Math.round(bocaChica.wind.speed*3.6)+'km/h'}, delay: 0.5});
    TweenMax.to('#bocaChica .cityName', 1, {text: {value: bocaChica.name}, delay: 0.5});
    TweenMax.fromTo('#bocaChica .temp',1, {text: {value: bocaChica.main.temp + '°C'}, autoAlpha: 0},{text: {value: bocaChica.main.temp + '°C'},autoAlpha:1, delay: 1});
  }).then(function() {
    if(goForLanding(bocaChica)){
    }
  });

  fetch(requestPortOfLosAngeles)
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    losAngeles = response;
    $('#losAngeles .weatherIcon').attr({'src': returnIconUrl(losAngeles.weather[0].icon), 'alt': losAngeles.weather[0].description, 'title': losAngeles.weather[0].description});
    TweenMax.to(losAngelesDirectionTween, 1, {progress: losAngeles.wind.deg/360, delay: 1});
    TweenMax.to(losAngelesWindmill, (15/losAngeles.wind.speed), {progress: 1, ease: Linear.easeNone, repeat: -1}); 
    TweenMax.to('#losAngeles .windSpeed', 1, {text: {value: Math.round(losAngeles.wind.speed*3.6)+'km/h'}, delay: 1});
    TweenMax.to('#losAngeles .cityName', 1, {text: {value: losAngeles.name}, delay: 1});
    TweenMax.fromTo('#losAngeles .temp',1, {text: {value: losAngeles.main.temp + '°C'}, autoAlpha: 0},{text: {value: losAngeles.main.temp + '°C'},autoAlpha:1, delay: 1.5});
  }).then(() => {
    if(goForLanding(losAngeles)){
    }
  });
}

getAPIdata();

    TweenMax.staggerFrom('article', 2, {y: '-50px', autoAlpha: 0, ease:Back.easeOut}, 0.2);
  // display the clock in 6 digits in the #clock element
  function showDigitalClock(h,i,s) {
    h = (h < 10) ? '0' + h : h;
    i = (i < 10) ? '0' + i : i;
    s = (s < 10) ? '0' + s : s;
    his = h + ':' + i + ':' + s;
    TweenMax.set(TIMEONSCREEN,{text:{value: his}});
  }

  // interval function of the anolog clock that also calls the timeOfDay function and the showDigitalClock function
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

    // update digital clock
    showDigitalClock(h,i,s);
  }

  // initial visualisaton of time
  showTime();

  // set time every second
  setInterval(function() {
    showTime();
  }, 1000);
});