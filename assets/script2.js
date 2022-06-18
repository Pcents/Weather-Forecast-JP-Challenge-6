var APIKey = "0fc4c11a5280d62b8043bc2aabd77ad1";
var searchInput = document.querySelector(".searchBtn");
var searchBar = document.querySelector('.inputValue');
var searchHist = document.querySelector(".search-cont");
var oldSearch = document.querySelector(".old-search");
var citiesStringArr = [];
var theData = document.querySelector('.weather-day-cont');
var littleCardEl = document.querySelector("#little-days")
var bigCardEl = document.querySelector("#big-day")


$(".searchBtn").on("click", function (e) {
    e.preventDefault();
    // console.log(".searchBtn");
    var searchBar = $(this).siblings(".form-control").val();
    addButton(searchBar);
    latLon(searchBar);
    littleCardEl.innerHTML = "";
    bigCardEl.innerHTML = "";
});

// finds coordinates to set off the other cards
function latLon(city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=metric")
        .then(response => response.json())
        // need curly brackets or it will ONLY return the next javascript command. a single line function
        .then(data => {
            console.log("finding things")
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            bigCard(lat, lon);
            littleCards(lat, lon);
            console.log(lat);
            console.log(lon);
        }
        )
        .catch(err => alert("You didn't say the magic word lat"))
}


// big card function-makes 1 big card
function bigCard(lat, lon) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=metric")
        .then(response => response.json())
        // need curly brackets or it will ONLY return the next javascript command. a single line function
        .then(data => {
            // console.log(data)

            // console.log("big card")
            for (var i = 0; i < 1; i++) {

                var weather = data.daily[i].weather[0].icon;
                var temp = data.daily[i].temp.day;
                var wind = data.daily[i].wind_speed;
                var humi = data.daily[i].humidity;
                var ultrav = data.daily[i].uvi;
                // get date in unix format
                var dt = data.daily[i].dt;
                // converts unix to normal human day
                var date = moment.unix(dt).format("MMM Do YYYY");
                var place = data.timezone;
                console.log(place);
                // console.log(date);
                console.log(weather);

                $("#big-day").append(theBigCard(weather, date, place, temp, wind, humi, ultrav));
            }
            //adds color to the uv line based on how bad it gunna get 
            if (ultrav < 2) {
                $(".add-uv-color").addClass("green")
            }
            else if (ultrav < 5 && ultrav > 2) {
                $(".add-uv-color").addClass("yellow")
            }
            else if (ultrav < 7 && ultrav > 5) {
                $(".add-uv-color").addClass("red")
            }
            else if (ultrav < 10 && ultrav > 7) {
                $(".add-uv-color").addClass("purple")
            }
            else if (ultrav > 10) {
                $(".add-uv-color").addClass("blue")
            }
        }

        )
        .catch(err => alert("You didn't say the magic word bc"))
};


// "https://openweathermap.org/img/wn/"

// the big card-sets up a bootstrap card via string and parameters
// dynamic string with png and generate the correct names and pass the correct variable
function theBigCard(weather, date, place, temp, wind, humi, ultrav) {
    return (

        '<div class="card" style="width: 30rem;">' +
        '<img class="card-img-top" src="https://openweathermap.org/img/wn/' + weather + '.png" width="100" height="250" alt="weather type">' +
        '<div class="card-body">' +
        '<h5 class="card-title">' + date + '</h5>' +
        '<h5 class="card-title">' + place + '</h5>' +
        '</div>' +
        '<ul class="list-group list-group-flush">' +
        '<li class="list-group-item">Temp: ' + temp + '</li>' +
        '<li class="list-group-item">Wind: ' + wind + '</li>' +
        '<li class="list-group-item">Humidity: ' + humi + '%</li>' +
        '<li class="list-group-item add-uv-color">UV Index: ' + ultrav + '</li>' +
        '</ul>' +
        '</div>'
    )
};

// // little cards function-makes 5 cards

function littleCards(lat, lon) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=metric")
        .then(response => response.json())
        // need curly brackets or it will ONLY return the next javascript command. a single line function
        .then(data => {
            console.log(data)
            console.log("little cards")
            for (var i = 1; i < 6; i++) {
                var weather = data.daily[i].weather[0].icon;
                var temp = data.daily[i].temp.day;
                var wind = data.daily[i].wind_speed;
                var humi = data.daily[i].humidity;
                var dt = data.daily[i].dt;
                var date = moment.unix(dt).format("MMM Do YYYY");
                $("#little-days").append(theLittleCard(weather, date, temp, wind, humi));
            }
        }
        )
        .catch(err => alert("You didn't say the magic word lc"))
};

// little cards sting of html and parameter
function theLittleCard(weather, date, temp, wind, humi) {
    return (
        '<div class="card" style="width: 13rem;">' +
        '<img class="card-img-top" src="https://openweathermap.org/img/wn/' + weather + '.png" alt="weather type">' +
        '<div class="card-body">' +
        '<h5 class="card-title">' + date + '</h5>' +
        '</div>' +
        '<ul class="list-group list-group-flush">' +
        '<li class="list-group-item">Temp: ' + temp + '</li>' +
        '<li class="list-group-item">Wind: ' + wind + '</li>' +
        '<li class="list-group-item">Humidity: ' + humi + '%</li>' +
        '</ul>' +
        '</div>'
    )
};

// adds buttons from search-buttons only work on refresh not after creating
function addButton(city) {
    var btnCreate = document.createElement("button");
    btnCreate.setAttribute("class", "names btn btn-outline-secondary")
    btnCreate.textContent = city;
    btnCreate.value = city;
    btnCreate.onclick = previousSearches;
    oldSearch.append(btnCreate);
    citiesStringArr.push(city);
    localStorage.setItem("cities", JSON.stringify(citiesStringArr))
    // what is this here for?
    city.textContent = searchBar;
    console.log(city);
};
// buttons in local storage append on load
$(document).ready(function () {
    console.log("ready");
    var loadStorage = localStorage.getItem("cities");
    if (loadStorage == null || loadStorage == "")
        return;

    var citiesStringArr = JSON.parse(loadStorage);

    for (i = 0; i < citiesStringArr.length; i++) {
        var btnCreate = document.createElement("button");
        btnCreate.setAttribute("class", "names btn btn-outline-secondary");
        btnCreate.textContent = (citiesStringArr[i]);
        btnCreate.value = (citiesStringArr[i]);
        btnCreate.onclick = previousSearches;
        oldSearch.append(btnCreate);
    }
});

function previousSearches() {
    var cityName = $(this).val();
    console.log(cityName);
    latLon(cityName);
    littleCardEl.innerHTML = "";
    bigCardEl.innerHTML = "";
};