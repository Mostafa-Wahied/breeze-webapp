let weather = {
    "apiKey": "08a396b19f8d847e32ca331fbd66aa53",
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
            + city
            +
            "&units=metric&appid="
            + this.apiKey
        )
            .then((Response) => Response.json()).then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        const { country } = data.sys;
        console.log(data);
        console.log(name, icon, description, temp, humidity, speed)
        document.querySelector(".city").innerText = "Weather in " + name + ", " + country;
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + "km/h";
        document.body.style.backgroundImage = "url('https://source.unsplash.com/random/1600x900?" + name + "')";
        document.querySelector(".weather").classList.remove("loading");
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});
// setting a default city
weather.fetchWeather("Seattle");


// Fetching cities for dropdown
async function fetchCities() {
    return (await fetch("/files/world-cities_json.json")).json();
}
// getting cities data from the promise provided by json
fetchCities().then(cityData => {
    console.log(cityData[0]);
    // creating an array to save the data in by looping through the data
    const cities = [];
    for (let i = 0; i < cityData.length; i++) {
        let obj = cityData[i];
        cities.push(obj.name)
    }

    // populating the dropdown with the cities
    var citiesObject = cities.reduce((obj, key) => { obj[key] = true; return obj; }, {});
    var citiesArray = Object.keys(citiesObject)
    console.log(citiesArray[0]);


    var str = '';
    for (let i = 0; i < citiesArray.length; i++) {
        str += '<option value="' + citiesArray[i] + '" />';
    }
    var citiesDatalist = document.getElementById("cities");
    citiesDatalist.innerHTML = str;
});


function myFunction() {
    var card = document.querySelector(".card");
    card.classList.toggle("light");
    var searchIcon = document.querySelector(".search-btn-dark");
    searchIcon.classList.toggle("search-btn-light")
    var searchInput = document.querySelector(".search-bar");
    searchInput.classList.toggle("search-bar-light")
}

const currentLocation = location.href;
const menuItem = document.querySelectorAll('a');
const menuLength = menuItem.length
for (let i = 0; i<menuLength; i++) {
    if (menuItem[i].href === currentLocation) {
        menuItem[i].className= "active"
    }
}