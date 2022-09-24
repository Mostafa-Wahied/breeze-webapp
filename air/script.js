// code for map
var OSM_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var OSM_ATTRIB = '&copy;  <a  href="https://openstreetmap.org/copyright">OpenStreetMap</a>  contributors';
var osmLayer = L.tileLayer(OSM_URL, { attribution: OSM_ATTRIB });

var WAQI_URL = "https://tiles.waqi.info/tiles/usepa-aqi/{z}/{x}/{y}.png?token=_TOKEN_ID_";
var WAQI_ATTR = 'Air  Quality  Tiles  &copy;  <a  href="https://waqi.info">waqi.info</a>';
var waqiLayer = L.tileLayer(WAQI_URL, { attribution: WAQI_ATTR });

var map = L.map('map').setView([51.505, -0.09], 11);
map.addLayer(osmLayer).addLayer(waqiLayer);

// To show current location
map.locate({ setView: true })
    .on('locationerror', function (e) {
        console.log(e);
        alert("Location access has been denied.");
    });
// end of code for map

// code for fetching data
const latInp = document.querySelector("#latitude");
const lonInp = document.querySelector("#longitude");
const airQuality = document.querySelector(".air-quality");
const airQualityStat = document.querySelector(".air-quality-status");
const srchBtn = document.querySelector(".search-btn");
const errorLabel = document.querySelector("label[for='error-msg");
const componentsEle = document.querySelectorAll(".component-val");

const appId = "08a396b19f8d847e32ca331fbd66aa53"
const link = "https://api.openweathermap.org/data/2.5/air_pollution"

const getUserLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onPositionGathered, onPositionGatherError);
    } else {
        onPositionGatherError({ message: "Can't access location. Enter Co-ordinates." })
    }
}

const onPositionGathered = pos => {
    let lat = pos.coords.latitude.toFixed(4),
        lon = pos.coords.longitude.toFixed(4)

    latInp.value = lat;
    lonInp.value = lon;
    getAirQuality(lat, lon);
}

const getAirQuality = async (lat, lon) => {
    const rawData = await fetch(`${link}?lat=${lat}&lon=${lon}&appid=${appId}`).catch(err => {
        onPositionGatherError(err)
    });
    const airData = await rawData.json();

    console.log(airData);
    setValuesOfAir(airData)
    setCompononetsOfAir(airData)
}

const setValuesOfAir = airData => {
    const aqi = airData.list[0].main.aqi
    let airStat = "", color = ""

    airQuality.innerText = aqi
    switch (aqi) {
        case 1:
            airStat = "Good"
            color = "rgb(14, 227, 53)"
            break
        case 2:
            airStat = "Fair"
            color = "rgb(15, 180, 25)"
            break
        case 3:
            airStat = "Moderate"
            color = "rgb(201, 204, 13)"
            break
        case 4:
            airStat = "Poor"
            color = "rgb(204, 83, 13)"
            break
        case 5:
            airStat = "Very Poor"
            color = "rgb(204, 13, 13)"
            break
        default:
            airStat = "Unknown"
    }

    airQualityStat.innerText = airStat
    airQualityStat.style.color = color
}

const setCompononetsOfAir = airData => {
    let component = { ...airData.list[0].components }
    componentsEle.forEach(ele => {
        const attr = ele.getAttribute('data-comp')
        ele.innerText = component[attr] += ' µg/m³'
    })
}

const onPositionGatherError = e => {
    errorLabel.innerText = e.message
}

srchBtn.addEventListener("click", () => {
    let lat = parseFloat(latInp.value).toFixed(4)
    let lon = parseFloat(lonInp.value).toFixed(4)


    getAirQuality(lat, lon)
})

getUserLocation();

const currentLocation = location.href;
const menuItem = document.querySelectorAll('a');
const menuLength = menuItem.length
for (let i = 0; i<menuLength; i++) {
    if (menuItem[i].href === currentLocation) {
        menuItem[i].className= "active"
    }
}