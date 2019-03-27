function showLocation(response, id, string, number) {
  $(id + ' .weatherIcon').attr({'src': returnIconUrl(response.weather[0].icon), 'alt': response.weather[0].description, 'title': response.weather[0].description});
  this[string+'TL'].to(this[string+ 'DirectionTween'], 1, {progress: response.wind.deg / 360}, string)
  .to(this[string + 'Windmill'], (15 / response.wind.speed), {progress: 1, ease: Linear.easeNone, repeat: -1}, string)
  .to(id + ' .windSpeed', 1, {text: {value: Math.round(response.wind.speed * 3.6)+'km/h'}}, string)
  .to(id + ' .cityName', 1, {text: {value: response.name}}, string)
  .fromTo(id + ' .temp',1, {text: {value: response.main.temp + '°C'}, autoAlpha: 0}, {text: {value: response.main.temp + '°C'}, autoAlpha:1}, string+'+=0.5');
  
  if (number == 1) {
    TweenMax.fromTo('header', 3, {y: '-50%', autoAlpha: 0}, {y: '0%', autoAlpha: 1, ease: Elastic.easeOut});
  }
  if (number == 3) {
    TweenMax.staggerFrom('article', 2, {y: '-50px', autoAlpha: 0, ease:Back.easeOut}, 0.5);
  }

  if(!goForLanding(response)){
    TweenMax.set(id,{color: 'rgba(255,255,255,0.3)',filter: 'grayscale(100%)'});
  } else {
    TweenMax.set(id,{color: 'rgba(255,255,255,1)',filter: 'grayscale(0%)'});
  }
}

function showRickAndMorty() {

    tl.from('footer #rick', 1, {x: '-100%', autoAlpha: 0, ease: Power4.easeOut})
    .fromTo('footer #rick .text', 1,{y: '50%', autoAlpha: 0},{text: {value: 'Hey, Morty!'},y:'0%', autoAlpha: 0.75})

    .from('footer #morty', 1, {x:'100%', autoAlpha: 0, ease: Power4.easeOut})
    .to('footer #rick .text', 1, {text: {value: ''}, autoAlpha: 0}, '+=1')

    .fromTo('footer #morty .text', 1, {y: '50%', autoAlpha: 0},{text: {value: 'Yes, Rick?'},y:'0%', autoAlpha: 0.75}, '-=3')
    .to('footer #morty .text', 1, {text: {value: ''}, autoAlpha: 0})

    .to('footer #rick .text', 3, {text: {value: 'It looks like we\'re going to land in, *burb*, ' + lowestWindSpeed().name + ' Morty.'}, autoAlpha: 0.75}, '-=1')
    .to('footer #rick .text', 1, {text: {value: ''}, autoAlpha: 0}, '+=2')

    .to('footer #morty .text', 2, {text: {value: 'Okay, but.. but.. but why Rick?'}, autoAlpha: 0.75}, '-=1')
    .to('footer #morty .text', 1, {text: {value: ''}, autoAlpha: 0}, '+=2')

    .to('footer #rick .text', 3, {text: {value: 'Because it has the lowest wind speed Morty.'}, autoAlpha: 0.75}, '-=1')
    .to('footer #rick .text', 1, {text: {value: ''}, autoAlpha: 0}, '+=2')

    .to('footer #rick .text', 3, {text: {value: 'Do you want to crash and die?'}, autoAlpha: 0.75})
    .to('footer #rick .text', 1, {text: {value: ''}, autoAlpha: 0}, '+=2')

    .to('footer #morty .text', 2, {text: {value: 'No Rick, let\'s go to '+ lowestWindSpeed().name + ' then.'}, autoAlpha: 0.75}, '-=1')
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

function showDate(date) {
  if (DATEONSCREEN.html() != '') {
    TweenMax.from(DATEONSCREEN, 3, {y: '-50%', autoAlpha: 0, ease: Elastic.easeOut});
  }
  DATEONSCREEN.html(date);
}

function getAPIdata() {
  fetch(requestLocationOne)
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    locations[0] = response;
    showLocation(locations[0], '#locationOne', 'locationOne', 1);
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
    showLocation(locations[2], '#locationThree', 'locationThree', 3);
    console.table(locations);
  }).then(() => {
    return fetch(requestRick)
  }).then((response) => {
    return response.json();
  })
  .then((response) => {
    $('footer #rick .avatar').attr({'src':response.image, 'alt':response.name,'title':response.name});
    return fetch(requestMorty);
  }).then((response) => {
    return response.json();
  })
  .then((response) => {
    $('footer #morty .avatar').attr({'src':response.image, 'alt':response.name,'title':response.name});
    showRickAndMorty(response);
  });
  console.log('%cLast updated: ' + new Date, 'font-weight: bold; font-family: sans-serif; font-size: 16px; color: #004F84;');
}

getAPIdata();

showTime();

setInterval(function() {
  showTime();
}, 1000);

setInterval(function() {
  updateAPIdata();
}, 600000);


$('#restartBtn').click(()=>{tl.restart();vibrate([200,100,50,50,50,50,200,100]);});