var ApiKey = "f2fae5d4e901642da34727ff9f70867d";
var city = "Atlanta";

//First need to get current temperature, humidity, wind speed, & uv index

//Then allow for us to search by city

//Then pull a 5-day forecast for the same city

//Then save all of that information to local storage
//Need to save city to local storage to show on sideBar
//Then pull that information from local storage to display onclick

counter = 0;
function setCounter() {
    var test = localStorage.getItem("city0");
    if(test === "") {
        for (var i = 0; i < 9; i++) {
            localStorage.setItem("city" + i, "");
    }
        counter = 0;
    }
    else {
        for (var i = 0; i < 9; i++) {
            test = localStorage.getItem("city" + i);
            if(test === "") {
                counter = i;
            }
            else if (counter === 8) {
                counter = 0;
            }
        }
    }
};

console.log(counter);
var qURLFirst = "https://api.openweathermap.org/data/2.5/weather?q=" + city + ",us&APPID=" + ApiKey;

$.ajax({
    url: qURLFirst,
    method: "GET"
}).then(function(response) {
    console.log(response);
    console.log(response.main.temp);
    console.log(response.main.humidity);
    console.log(response.wind.speed);
    console.log(city);

    var temp = (response.main.temp - 273.15) * 9 / 5 + 32;
    var humidity = response.main.humidity;
    var windSpeed = response.wind.speed;
    
    localStorage.setItem(city + " tempCurrent", temp);
    localStorage.setItem(city + " humidityCurrent", humidity);
    localStorage.setItem(city + " windSpeedCurrent", windSpeed);
    localStorage.setItem("city" + counter, city);

    var lat = response.coord.lat;
    var lon = response.coord.lon;
    
    console.log(lat);
    console.log(lon);
    var qURLSecond = "http://api.openweathermap.org/data/2.5/uvi?appid=" + ApiKey + "&lat=" + lat + "&lon=" + lon;
    
    $.ajax({
        url: qURLSecond,
        method: "GET"
    }).then(function(response2) {
        console.log(response2);
        console.log(response2.value);

        var uvIndex = response2.value;

        var qURLThird = "http://api.openweathermap.org/data/2.5/forecast?appid=" + ApiKey + "&lat=" + lat + "&lon=" + lon;

        localStorage.setItem(city + " uvCurrent", uvIndex);

        $.ajax({
            url: qURLThird,
            method: "GET"
        }).then(function(response3) {
            console.log(response3);
            if(counter === 8) {
                counter = 0;
            }
            else {
                counter++;
            };
            for(var i = 0; i < 5; i++) {
                console.log(response3.list[i].main.temp);
                console.log(response3.list[i].main.humidity);

                var futureTemp = (response3.list[i].main.temp  - 273.15) * 9 / 5 + 32;
                var futureHumidity = response3.list[i].main.humidity;

                localStorage.setItem(city + " tempDay" + i, futureTemp);
                localStorage.setItem(city + " humidityFuture", futureHumidity);
            }
        })
    })
  });