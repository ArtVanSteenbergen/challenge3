/**
	Constants
*/
const
HTML = $('html'),
DATEONSCREEN = $('#date'),
TIMEONSCREEN = $('#time'),
DAYSOFWEEK = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
MONTHSOFYEAR = ['January','February','March','April','May','June','July','August','September','October','November','December'];
MAXWINDSPEED = 25/3.6; //25km/h in m/s

/**
	Variables
*/
var
citys = ['Cape Canaveral', 'Port Isabel', 'Long Beach'],
// citys = ['Cape Canaveral', 'Brownsville', 'Los Angeles'],
// citys = ['The Hague', 'Limburg', 'Groningen'],
// citys = ['London', 'New Jersey', 'Washington'],
// citys = ['Alaska','Hawai', 'Ohio'],

locations = new Array,

tl = new TimelineMax(),
locationOneTL = new TimelineMax(),
locationTwoTL = new TimelineMax(),
locationThreeTL = new TimelineMax(),

datetime = new Date(),
h = datetime.getHours(),
i = datetime.getMinutes(),
s = datetime.getSeconds(),
n = DAYSOFWEEK[datetime.getDay()],
d = datetime.getDate(),
m = MONTHSOFYEAR[datetime.getMonth()],
Y = datetime.getFullYear(),

requestLocationOne = `https://api.openweathermap.org/data/2.5/weather?appid=b0c8dafa512a0134e90df6ece3c2b7a2&q=${encodeURI(citys[0])}&units=metric`,
requestLocationTwo = `https://api.openweathermap.org/data/2.5/weather?appid=b0c8dafa512a0134e90df6ece3c2b7a2&q=${encodeURI(citys[1])}&units=metric`,
requestLocationThree = `https://api.openweathermap.org/data/2.5/weather?appid=b0c8dafa512a0134e90df6ece3c2b7a2&q=${encodeURI(citys[2])}&units=metric`,

locationOneWindmill = TweenMax.to('#locationOne .windmill', 1, {rotation: '360', ease: Linear.easeNone, repeat: -1, paused: true}),
locationTwoWindmill = TweenMax.to('#locationTwo .windmill', 1, {rotation: '360', ease: Linear.easeNone, repeat: -1, paused: true}),
locationThreeWindmill = TweenMax.to('#locationThree .windmill', 1, {rotation: '360', ease: Linear.easeNone, repeat: -1, paused: true}),

requestRick = 'https://rickandmortyapi.com/api/character/1',
requestMorty = 'https://rickandmortyapi.com/api/character/2',

locationOneDirectionTween = TweenMax.to('#locationOne .windDirection', 1, {rotation: '360', ease: Linear.easeNone, repeat: -1, paused: true}),
locationTwoDirectionTween = TweenMax.to('#locationTwo .windDirection', 1, {rotation: '360', ease: Linear.easeNone, repeat: -1, paused: true}),
locationThreeDirectionTween = TweenMax.to('#locationThree .windDirection', 1, {rotation: '360', ease: Linear.easeNone, repeat: -1, paused: true}),

baseWeatherUrl = 'img/weather-icons/';
locationTwoTL.add('locationTwo', '+=1');
locationThreeTL.add('locationThree', '+=1.5');