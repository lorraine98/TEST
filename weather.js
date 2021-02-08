const weather = document.querySelector(".js-weather")

const API_KEY = '6697b7a6d850aa9dbb4c05ae78ef0af6';
const COORDS = 'coords';

function getWeather(lat, lon){
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    fetch(URL).then(
        function(response) {
            return response.json();
        }).then(function(json){
            const tempertaure = json.main.temp;
            const place = json.name;
            weather.innerText = `${tempertaure} @ ${place}`
        })
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj))
};

function handleGeoError(){
    console.log("Cant access to geo loaction")
};

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords (){
    const loadCoords = localStorage.getItem(COORDS);
    if (loadCoords === null){
        askForCoords();
    } else {
        const parsedLoadcoords = JSON.parse(loadCoords);
        getWeather(parsedLoadcoords.latitude, parsedLoadcoords.longitude);  
    }
}

function init(){
    loadCoords();
}

init();